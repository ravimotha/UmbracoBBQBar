# Umbraco BBQ Bar

The first online Umbraco bar was built for the virtual Codegarden in 2021, with the hope it would make us all feel like we were together, despite being apart. The project is a collaboration between [Sven Geusens](https://twitter.com/migaroez) and [Lotte Pitcher](https://twitter.com/lottepitcher).

It reopened for Umbraco's hackathon in October 2021.

And now the pop-up bar has moved outside to a sunny park for the virtual Umbraco BBQ in the summer of 2022!

## How It Works

The bar app is a .net core app hosted on Linux. A Twitter webhook has been registered on the [@umbracobar](https://twitter.com/umbracobar) twitter account so notifications of all Twitter events are sent to the bar app.

Each time the bar opens it has had a different front-end. Each front-end is an Azure Static Web App, deployed from here using the GitHub action provided by Azure. 

Both this front-end and [the bar app](https://github.com/LottePitcher/CodegardenBar) are open source, so you can work out the rest from delving around in the code! 

Remember when viewing a repo in GitHub you can change 'github.com' to 'github.dev' to run VS Code in the browser. I keep forgetting that, so this reminder is really for myself ;-)

## SASS Changes

I also need a reminder on how to make sass changes in this project:

Using VS Code:

- Install 'Live Sass Compiler' VS code extension
- Click 'Watch Sass' from the status bar at the bottom
- Commit the .sass and the generated .css files 

Yes I know that the .css files shouldn't be committed but didn't have time to do it the 'right' way. Pull requests are welcome...
