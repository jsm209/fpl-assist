---
title: 'About FPL Suggestions'
date: '2022-10-14'
---


**What is FPL Assist?**

FPL (Fantasy Premier League) Assist is a tool fantasy football managers can use to ask questions of the publicly available FPL data about the different teams and players and their performance. It provides tools to query teams and players based on qualities like average points earned, ratios of being trading in versus traded out, and can be filtered to exclude certain qualities (like players belonging to particular teams) to help you find the best players for your weekly transfers. The tools can also inform the performance of teams in specific matchups, as well as find "risky" players like those injured or who currently have 4 yellow cards.

&nbsp;

**What are some examples of questions I can ask the data?**

Some questions that can be found out through these tools are:
- What defense player is the most traded in this week?
- Which midfielder players have a form above 6.0 and costs less than 8.0?
- How will team A do against team B if team A is playing at home?
- Which players, who do not have 4 or more yellow cards, have more than 40 total points?

&nbsp;

**Where does this data come from?**

The data comes from the public endpoints available from the FPL API. 

&nbsp;

**How accurate is this data? How often is it updated?**

The data comes from the actual FPL API, so it is updated and maintained at the same cadence as the official FPL app and website. More specifically, for this site the data is updated whenever the page loads/reloads. 

&nbsp;

**Will this be compatible with viewing on a mobile device?**

Unfortunately probably not because some data visualizations require more screen space to accomdate the complexity of and size of the data.

&nbsp;

**What other data visualization types and tools might be available in the future?**

The main tool being planned right now is an algorithm to suggest optimal player transfers based on your current team and budget (ex: Given a player's worth and the money remaining in the bank, what is the highest form player that can be traded according to the current team's player restrictions and the current gameweek's fixture difficulties? What about multiple transfers in a given week?).

Other planned tools are the ability to compare two particular players with more robust visualizations, for example a polar area chart, or against some aggregated set of select players.

Additionally, implementing comparisons over time as opposed to comparisons only within the current game week.

&nbsp;

**Why are the scatterplot points unreadable when they are in a cluster?**

This is a drawback of Chart.js, which is the library used for this visualization. Currently there are so many players with the same/similar data that they sit too close to each other such that the "hover radius" will detect many points. A different scatterplot will 
be used in the future.