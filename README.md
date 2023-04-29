# PROJECT 1 : FINANCIAL DECISION

## SUMMARY

Despite multiple cooling measures launched in the past few years, housing prices remains high and it makes many wonder if home owenrship remains the best option for housing arrangement.

This project aims to create a simple dashboard to provide key information (i.e. resale flat prices and rental prices over the years) to user so as to aid them in making important financial decision - Housing arrangement.

Problem Statement: Buying or renting a flat, which option works best for you?

## UX/UI

The objective of this dashboard is to aid user in making financial decisions on their housing. Amongst all the factors affecting the choice of house, location and flat types are usually the more important ones. Thus, dropdown menus are created for these elements.

Instead of computing the average resale and rental flat prices for the year and presenting the computed results in a table format, a chart form would be a better visualization tool for users to observe the trend of the prices over the years.

The average prices call out on the charts will enable users to determine how much budget they possibly have to set aside for housing arrangement and/or determine would the particular preferred flat type and town is within their means.

For users who are more forward looking, the trends observed from the charts allow one to project the future housing prices and faciliate one to make further calculations (if they prefer) on whether purchasing or renting option would suits them the best in a long run.

## FEATURES

The dashboard extracts relevant public data shared by government agencies and presents a view, in the format of chart, for user's easy reference.

User can indicate their town and flat type preferences in the dropdown. Based on the selected information, the programme computes the average resale flat prices and rental prices by year and presents the calculated information in synchronised chart format.

## USER STORIES

1. As user, I am a young adult who is making plan for new housing arrangements. I prefer not to opt for Build-To-Order (BTO) projects due to its constraints (e.g. time to completion are typically long, flat size are relatively smaller as compared to older HDB projects etc.).
2. As a user, I want to know how much is the resale and rental flat prices of my preferred town and flat type.
3. As a user, I want to know given my current budget and requirements, what is the best housing option for me.
4. The dashboard will provide dropdowns for users to choose their preferene and user will be able to observe the trend of the resale / rental flat prices.

## TECHNOLOGIES USED

The main language used is Javascript and HTML. Libraries used include (see URL link under `CREDITS`):

1. Axios - for importing API data
2. Jquery - for accessing variables in the HTML script
3. CSS - for formatting and styling of the HTML script
4. APEX Chart - for presented data in chart format

## TESTING

| Test Case # | Test Case Description                                                               | Test Steps                                                                                                                                                                 | Expected Result                                                                                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1           | Select preferences from dropdowns <br>(a) Town <br> (b) Flat type                   | Click on the dropdown button                                                                                                                                               | Upon clicking on the dropdown button, the dropdown menu of the towns and flat types are shown accordingly. When clicking on any other part of the window, the dropdown menu will be closed. |
| 2           | Alert to notify users to indicate preferences if no town and/or flat type is chosen | Click on the "Fetch Data" button with no preference is indicated at both dropown menus (i.e. Options chosen are "Choose preferred town" and "Choose preferred flat type"). | Alert prompt to show "Please select a town / flat types". No graphs will be shown.                                                                                                          |
| 3           | Alert to notify users that no towns and/or flat types are not found from dataset    | Click on the "Fetch Data" button with the following preferences indicated - Preferred town to be "Ang Mo Kio" and preferred flat type to be "Multi-generation".            | Alert prompt to show "No resale / rental flats found. Please select another Town or Flat Type".                                                                                             |
| 4           | "Fetch Data" button extracts data and presents in graphical view                    | Click on the "Fetch Data" button with the following preferences indicated - Preferred town to be "Ang Mo Kio" and preferred flat type to be "4 Room".                      | Two graphs - Rental prices and Resale Flat prices - will be shown at the bottom of the page, with data labels indicating the prices for each year.                                          |
| 5           | Testing the synchronised chart capability                                           | Hover the pointer on data points at either of the graphs                                                                                                                   | Able to see both pop-ups showing the data labels of both rental and resale flat price in the same year.                                                                                     |

## DEPLOYMENT

1. The hosting platform is Github.io.
2. Git commit and Git push will allow updates will deploy written codes.

## LIVE LINK

- [Financial Decision](https://lindiyip.github.io/)

## CREDITS AND ACKNOWLEDGEMENT

- [Singapore past years resale flat prices](https://data.gov.sg/dataset/resale-flat-prices)
- [Singapore past years rental prices](https://data.gov.sg/dataset/renting-out-of-flats)
- [Create line and bar charts](https://apexcharts.com/docs/chart-types/line-chart/)
- [Create synchronised charts](https://apexcharts.com/docs/chart-types/synchronized-charts/)
- [General coding](https://www.w3schools.com/)
