# Infinite Todo List Assignment

## Intro

Create this app using React Create App, I was originally using for loops + recursion to add and edit the array of todos,
but the performance hangs when you nest too deep. I switched to using a custom recursion function to flatten, add/edit,
then unflatten back into the array tree based on parentId. Sadly this didn't fix the perf issues when the nest gets to deep.

The proper solution is to store the depth and parent location on the child todo, but sadly due to time constraints I can't rework that logic
it'd look something like:

```
  todo: {
    id: '1',
    children: [
      {
        id: '1-1',
        children: [
          id: 1-1-1,
        ],
      }
    ],
  }
```

## Created With

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install the needed dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
