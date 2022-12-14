// Saber config file
// https://saber.land/docs/saber-config.html

module.exports = {
    siteConfig: {
        // Change this to the production URL of your website
        url: 'http://localhost:3000',
        // description:
        //     'Web Developer focused on creating interactive experiences, and beautiful websites',
    },

    // Use the package `saber-theme-portfolio`
    // More: https://saber.land/docs/themes.html
    theme: './theme/dist',
    // Configure the theme
    themeConfig: {
        profilePicture: 'https://avatars.githubusercontent.com/u/101024113?v=4',
        projects: 'pinned-project',
        style: 'light',
        disqus: 'portfolio',
        github: 'Zalonics',
        twitter: '',
        nav: [
            {
                text: 'Home',
                link: '/',
            },
            {
                text: 'About',
                link: '/about',
            },
            {
                text: 'Contact',
                link: '/contact',
            },
            {
                text: 'Posts',
                link: '/posts',
            },
        ],
        skills: [
            {
                topic: 'html',
                description: `HTML - The markup I use on a daily basis`,
            },
            {
                topic: 'css',
                description: `CSS - My unexpected love thanks to flexbox and grid`,
            },
            {
                topic: 'sass',
                description: `Sass - CSS but on steroids, and what I prefer to write`,
            },
            {
                topic: 'bootstrap',
                description: `Bootstrap - When I can't be bothered to write all my css`,
            },
            {
                topic: 'javascript',
                description: `Javascript - Despite my use of Vue, I do enjoy using vanilla JS`,
            },
            {
                topic: 'typescript',
                description: `Typescript - What I default to on bigger projects. <3`,
            },
            {
                topic: 'vue',
                description: `Vue - My frontend framework of choice`,
            },
            {
                topic: 'react',
                description: `React - Some familiarity with, not as much as Vue`,
            },
            {
                topic: 'cpp',
                description: `C++ - My first programming language`,
            },
            {
                topic: 'firebase',
                description: `Firebase - When I need a quick backend`,
            },
            {
                topic: 'sql',
                description: `SQL - Not a genius, but I can query`,
            },
            {
                topic: 'nodejs',
                description: `NodeJS - When I need a custom backend`,
            },

            {
                topic: 'linux',
                description: `Linux - Because I love developing on Unix systems`,
            },
            {
                topic: 'wordpress',
                description: `Wordpress - Mainly as CMS using DiviBuilder, Glutenburg`,
            },
        ],
    },

    permalinks: {
        page: '/:slug',
        post: '/posts/:slug',
    },

    plugins: [
        {
            resolve: 'saber-plugin-query-posts',
        },
        {
            resolve: 'saber-plugin-feed',
            options: {
                atomFeed: true,
            },
        },
    ],
}
