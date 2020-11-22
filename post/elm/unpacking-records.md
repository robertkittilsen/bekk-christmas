---
calendar: elm
post_year: 2020
post_day: 2
title: Unpacking Records
image: https://source.unsplash.com/IkjROahgUoo/2000x800
ingress: Records in Elm are quite like JavaScript objects. In ES6, destructuring
  objects can produce compact and concise code. This article invites readers to
  take a look at some techniques that Elm offers to that same end.
links:
  - title: Pattern Matching Records @ Beginning Elm
    url: https://elmprogramming.com/pattern-matching.html#pattern-matching-records
  - title: Records @ elm-lang.org
    url: https://elm-lang.org/docs/records
authors:
  - Jørgen Tu Sveli
---
What in ES6 is known as destructuring, is referred to as pattern matching within Elm. Pattern matching records appearing as function parameters is our focus for now. Yet, the technique is applicable in other cases as well. The example below presents the basic syntax. The code declares a type for a shopping cart item and a function that calculates the total for that cart item:

```elm
type alias CartItem = 
    { unitPrice: Int
    , amount: Int
    }

cartItem = { unitPrice = 19, amount = 2 }

calculateTotal : CartItem -> Int
calculateTotal { unitPrice, amount } =
    unitPrice * amount

calculateTotal cartItem -- 38
```

We now have shorthand access to the fields of the record. The calculation presents itself uncluttered. There might be cases where a record contains more fields than interest us. We can create shorthands for a subset of the fields while also retaining a reference to the whole of the record.

```elm
type alias CartItem = 
    { unitPrice: Int
    , amount: Int
    , description
    }

cartItem = { unitPrice = 19, amount = 2, description = "Washable, reusable face mask" }

calculateTotal ({unitPrice, amount} as wholeItem) =
    unitPrice * amount\
        |> otherFunction wholeItem
```

Here we unwrap `unitPrice` and `amount` to calculate the total, but keep a reference to the whole record. The `otherFunction` needs access to the rest of the record. It also receives the calculated total as an argument.

Let’s move on to an example from the real world. Records appear somewhere in the model of most elm apps. Different parts of an elm app uses the model in different ways. Some functions update the model and change only one or a few of the fields. Other functions, read larger numbers of members of the model at the same time. This happens often in view code.

Behold the Model of the [Elm todomvc app](https://github.com/evancz/elm-todomvc/blob/master/src/Main.elm).

```elm
type alias Model =
    { entries : List Entry
    , field : String
    , uid : Int
    , visibility : String
    }
```

todomvc's view function defines the top level structure of the view. Through varius calls, it delegates parts of the model for rendering:

```elm
view : Model -> Html Msg
view model =
    div
        [ class "todomvc-wrapper"
        , style "visibility" "hidden"
        ]
        [ section
            [ class "todoapp" ]
            [ lazy viewInput model.field
            , lazy2 viewEntries model.visibility model.entries
            , lazy2 viewControls model.visibility model.entries
            ]
        , infoFooter
        ]
```

We could apply pattern matching to avoid repeating `model.`:

```elm
view : Model -> Html Msg
view { entries, field, visibility } =
    div
        [ class "todomvc-wrapper"
        , style "visibility" "hidden"
        ]
        [ section
            [ class "todoapp" ]
            [ lazy viewInput field
            , lazy2 viewEntries visibility entries
            , lazy2 viewControls visibility entries
            ]
        , infoFooter
        ]
```

Finally, it's worth to consider a caveat. Over-applying the technique obscures the origins of each field in the function body. This happens quicker as functions bodies grow. Still, pattern matching is a necessary and useful tool to grasp