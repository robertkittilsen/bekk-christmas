---
calendar: elm
post_year: 2020
post_day: 14
title: Combining Maybe's in Elm
ingress: Ever needed to combine different Maybe-values to produce another value?
  In this article, we explore just that.
links:
  - url: https://package.elm-lang.org/packages/elm/core/latest/Maybe#map2
    title: Maybe.map2
authors:
  - Fredrik Løberg
---
Let us say that you are given the task to implement a function which combines two values to some other type if, and only if, both values are present.
For example, consider the following `toContactPerson` function:

```elm
type alias ContactPerson =
    { firstName: String
    , lastName: String
    }

toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson firstName lastName =
    ...
```

This function is trivial to implement, at least if you are somewhat familiar with the `Maybe` type.
With standard pattern-matching, `toContactPerson` can be implemented like this:

```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson maybeFirstName maybeLastName =
    case ( maybeFirstName, maybeLastName ) of
        ( Just firstName, Just lastName ) ->
            Just (ContactPerson firstName lastName)

        _ ->
            Nothing
```

Simple enough, but you may have already noticed that this implementation is somewhat strenuous to read. Now, imagine how it would read if we expanded the `ContactPerson` record with additional fields such as phoneNumber, email, address, etc. Not very pleasant!


Another, arguably much more readable, approach is to use the utility functions `Maybe.map2`, `Maybe.map3`, `Maybe.map4`, and so on.
While `Maybe.map` takes a function `a -> b` and a `Maybe a`, `Maybe.map2` takes a function `a -> b -> c` and two Maybe's, `Maybe a` and `Maybe b`.
The mapping function is applied if, and only if, both values are present. With `Maybe.map2`, our `toContactPerson` function can be improved to:


```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson maybeFirstName maybeLastName =
    Maybe.map2 ContactPerson maybeFirstName maybeLastName
```

or if we exploit partial application:

```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson =
    Maybe.map2 ContactPerson
```