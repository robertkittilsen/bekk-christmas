---
calendar: thecloud
post_year: 2020
post_day: 6
title: Cloud Janitors
image: https://images.unsplash.com/photo-1603618090554-f7a5079ffb54
ingress: Cloud environments quickly grow in size. There’s tons of services and
  we start utilizing SaaS solutions for different problems. Solving problems
  through infrastructure and SaaS is after all one of the main reasons we're in
  the cloud in the first place.
authors:
  - Halvor Hølmebakk Mangseth
---
## The problem
But everything that glitters isn't gold. With a lower bar for creating new resources we can easily end up with clutter. There are also limitations when using SaaS-solutions. The built-in functionality doesn’t fully cover our needs, so we add on to it, to work as needed. Storage is created to test different stuff, but developers forget to delete it afterwards. Maybe resources aren’t tagged correctly. 

Personally we ended up writing a bunch of small scripts and cloud functions that was scattered all around. Maintaining it turned into a pain for various reasons. Sometimes it was hard figuring out if something similar was already running. Other times services was forgotten. The point being, keeping control of everything wasn't always easy.


## Enter the janitor concept! 
To group these tasks, we’re structuring them under the “janitor” concept. 

There is, after all, always some general maintenance that needs doing. Tasks like sweeping, making sure the message board is updated, or shutting off the lights can easily be transferred to deleting unused logs, setting the correct tags for resources or scaling down services at night.


To try and make this fluffy subject a bit more tangible let’s look at some examples we use today in our AWS cloud. 
<br />


### The container registry janitor

We have a centralized container registry where we keep all our images. However we really don’t need to keep every build saved for eternity. We also want to make sure all images are accessible to all our accounts. This is mostly done at publication of a new image, but checking this routinely as well handles images pushed from non-standard sources. 

Schedule: Once a day

Tasks: 

Loop through the image repository and:
* Delete any untagged images
* Delete pre-release images older than X days (we’ve got a limit of 60 at the moment), but not our releases as we want to preserve these.
* Make sure the images are accessible to other cloud accounts if wanted


### The log cleaning janitor

While log retention is easy to set in most systems, there’s always the oddball out. It's can be beneficial to collect the log cleaning in one place. Removing unused logs reduces unnecessary cost as well. 

Schedule: Daily or hourly, depending on needs
Tasks: 
* Set retention rate on logs where it isn’t set.
* Delete old logs!


### The Pod janitor

We run a couple of janitors in our kubernetes cluster. One of these is the pod janitor. Today it’s running with a couple of tasks. 
Schedule: every 10 minutes
Tasks:
* Normalize and make sure the memory and cpu limits for our Docker containers follow the standard.
* Look for a max_age tag on the pod. If the age of the pod exceeds this, delete it, given that all other replicas of the app are running and healthy. 


### Cluster Janitor

In an environment with multiple kubernetes clusters that morphs and changes a custodian can help keep things in order. One thing we’ve experienced is that setting “tags” on our resources is a great help. Tags are generally easy to access for interested parties, so we use these to describe different resources. 

Schedule: frequently

Tasks:

* Based on the load balancer version, set “tags” (annotations), that’s read by our deploy-scripts to know which type of ingress objects should be created. 
* Set tags on namespaces based on naming rules. These are used by deploy-scripts to determine which cluster to deploy to in a multi-cluster environment. 


## How to get started

Well, for us we ended up just creating a set of small FaaS python functions we run on a cron job schedule, since that was the easiest way to get going with our existing system. There is however a bunch of systems out there like the [cloud custodian](<https://cloudcustodian.io/docs/index.html>). 

## 👋

Janitors are not a revolutionary change to how we work with cloud resources. However, if you’ve found ourselves in a situation where it’s getting harder to figure out how to organize your utility scripts, or maybe have a hard time getting started on creating them, I hope this has given you a small framework to work with!