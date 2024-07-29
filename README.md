## Bob Ross Episodes filter!

### How it works:
![Screenshot 2024-07-29 161447](https://github.com/user-attachments/assets/e0c1796c-b345-445b-8b11-4c0a6348cf1a)
#### Select your filter query then click submit!
![Screenshot 2024-07-29 161505](https://github.com/user-attachments/assets/b303b64b-252f-4bd1-a90c-4df9c0a32e3c)

## How to install
#### clone this repository and then run `node server.js` in root to start the server.
#### After that, host index.html locally, or just click on the file and open it in the browser.

## Resources

- [Bob Ross Episode Data CSV](https://intranet.atlasschool.com/rltoken/PAGbinXyYEO-rCGA_UNk8w)
- [Bob Ross Paint Color Details CSV](https://intranet.atlasschool.com/rltoken/ku_GZYlCfgW1b35EL_LpfQ)

## Project Context

In this project we are going to explore the idea of ETL (Extract, Transform, Load), which is the process of taking data from multiple unique sources, modifying them in some way, and then storing them in a centralized database. This is a very common practice when collecting data from systems in order to utilize that data in another system. This data may come in the form of CSV, JSON, XML, API requests with other 
custom formats, etc - it might even be that you have direct access to several databases with different, but relatable data that you want to be merged into another database in order to gain insight from it in some way.

## Presented Problem

Your local public broadcasting station has an overwhelming amount of requests for information on The Joy of Painting. Their viewers want a website that allows them to filter the 403 episodes based on the following criteria:

- Month of original broadcast
    - This will be useful for viewers who wish to watch paintings that were done during that same month of the year
- Subject Matter
    - This will be useful for viewers who wish to watch specific items get painted
- Color Palette
    - This will be useful for viewers who wish to watch specific colors being used in a painting

Your local broadcasting station has already done some leg work to gather data, however it is spread out across multiple different files and formats, which makes the data unusable in its current form. They’ve 
also already hired another team to build a front-end to allow their viewers to filter episodes of The Joy of Painting and now they’ve hired you to help them with the process of designing and building a database that will house this collected data in a way that is usable and also build an API to access it.
