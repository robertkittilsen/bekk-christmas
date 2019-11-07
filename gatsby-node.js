const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
    const frontpageTemplate = path.resolve(`src/templates/frontpage.js`);
    const blogPostTemplate = path.resolve(`src/templates/post.js`);
    const calendarTemplate = path.resolve(`src/templates/calendar.js`);

    const { createPage, createRedirect } = actions;

    const result = await graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                nodes {
                    frontmatter {
                        post_day
                        post_year
                        calendar
                    }
                    id
                }
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    const envCalendar = process.env.CALENDAR_ENV;
    const isPreview = envCalendar === 'preview';
    const calendarsWithContent = new Set();

    if (envCalendar) {
        // Create frontpage of current calendar
        const calendarSet = new Set();

        if (!isPreview) {
            createPage({
                path: '/',
                component: calendarTemplate,
                context: {
                    year: 2019,
                    calendar: envCalendar,
                    startOfLink: '',
                },
            });
            calendarSet.add(`${envCalendar}${2019}`);
        }

        let latestYear = 0;
        let latestDay = 0;

        const posts = result.data.allMarkdownRemark.nodes.filter(node => node.frontmatter.calendar);
        posts.forEach(node => {
            const { calendar, post_year, post_day } = node.frontmatter;

            const showCalendar = envCalendar === calendar || isPreview;

            if (envCalendar && !showCalendar) {
                // Filter posts from other calendars
                return;
            }

            // Path to each calendar
            let calendarPath = '';

            if (isPreview) {
                calendarPath = `/${calendar}`;
            }

            // Create page for each post
            createPage({
                path: `${calendarPath}/${post_year}/${post_day}`,
                component: blogPostTemplate,
                context: {
                    id: node.id,
                },
            });

            if (post_year !== 2019) {
                calendarPath += `/${post_year}`;
            }

            // Create page for each calendar
            const mapKey = calendarPath;
            if (!calendarSet.has(calendarPath)) {
                // Only create page for each calendar once
                createPage({
                    path: calendarPath,
                    component: calendarTemplate,
                    context: {
                        year: post_year,
                        calendar: calendar,
                        startOfLink: calendarPath,
                    },
                });
                calendarSet.add(mapKey);
                calendarsWithContent.add(calendarPath);
            }

            if (post_year > latestYear) {
                latestYear = post_year;
            }

            if (post_year >= latestYear && post_day > latestDay) {
                latestDay = post_day;
            }
        });

        createRedirect({
            fromPath: `/latest`,
            toPath: `/${latestYear}/${latestDay}`,
            redirectInBrowser: true,
            isPermanent: false,
        });
    }

    // Frontpage for bekk.christmas
    if (!envCalendar || isPreview) {
        createPage({
            path: '/',
            component: frontpageTemplate,
            context: {
                calendarsWithContent: Array.from(calendarsWithContent),
                day: 1, // Todo: calculate these values
                year: 2019,
            },
        });
    }
};

// Run after all nodes have been created
exports.sourceNodes = ({ actions, getNodes, getNode }) => {
    const { createNodeField } = actions;

    connectAuthorsToPosts(getNode, getNodes, createNodeField);
};

const connectAuthorsToPosts = (getNode, getNodes, createNodeField) => {
    // Get all post nodes
    const postNodes = getNodes().filter(
        node => node.internal.type === 'MarkdownRemark' && node.frontmatter.calendar
    );

    // Get all author nodes
    const authorNodes = getNodes().filter(
        node => node.internal.type === 'MarkdownRemark' && !node.frontmatter.calendar
    );

    // Add author information to each post
    postNodes.forEach(post => {
        const { authors = [] } = post.frontmatter;

        const enrichedAuthors = authors.map(author => {
            const match = authorNodes.find(node => author === node.frontmatter.title);
            const { title, socialMediaLink } = match.frontmatter;

            return {
                title,
                socialMediaLink,
            };
        });

        if (enrichedAuthors) {
            createNodeField({
                node: getNode(post.id),
                name: 'enrichedAuthors',
                value: enrichedAuthors,
            });
        }
    });
};
