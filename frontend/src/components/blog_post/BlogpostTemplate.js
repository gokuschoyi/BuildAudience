import { Box } from '@mui/material'
import React from 'react'
import bg from '../../assets/bg.png'
import BlogPostEditor from './blog_post_components/BlogPostEditor'
import BlogCover from './blog_post_components/BlogCover'
import BlogIntroduction from './blog_post_components/BlogIntroduction'
import BlogContentHolder1 from './template/BlogContentHolder1'
import BlogContentHolder2 from './template/BlogContentHolder2'
import BlogContentHolder3 from './template/BlogContentHolder3'
import BlogContentHolder4 from './template/BlogContentHolder4'
import BlogContentCustomColors from './template/BlogContentCustomColors'
import BlogPostFooter from './blog_post_components/BlogPostFooter'
const BlogpostTemplate = (props) => {
    const { template, sectionColor, backgroundColor } = props;
    const blogData = [
        {
            title: 'Section One Heading',
            content: 'Lorem ipsum dolor s sit amet co nsectetur adipis icing e l it sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            title: 'Section Two Heading',
            content: 'Lorem ipsum dolor s sit amet co nsectetur adipis icing e l it sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            title: 'Section Three Heading',
            content: 'Lorem ipsum dolor s sit amet co nsectetur adipis icing e l it sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            title: 'Section Four Heading',
            content: 'Lorem ipsum dolor s sit amet co nsectetur adipis icing e l it sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            title: 'Section Five Heading',
            content: 'Lorem ipsum dolor s sit amet co nsectetur adipis icing e l it sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ]

    const content = "Lorem ipsum dolor s sit amet co nsectetur adipis icing e l it sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    const handleTemplate = () => {
        if (template === 'Template 1') {
            return (
                <Box justifyContent='center' display='flex' className='section-content'>
                    <Box width='80%'>
                        {blogData.map((data, index) => {
                            return (
                                <BlogContentHolder1 key={index} title={data.title} content={data.content} />
                            )
                        }
                        )}
                    </Box>
                </Box>
            )
        }
        else if (template === 'Template 2') {
            return (
                <Box justifyContent='center' display='flex' className='section-content'>
                    <Box width='80%'>
                        {blogData.map((data, index) => {
                            return (
                                <BlogContentHolder2 key={index} title={data.title} content={data.content} />
                            )
                        })
                        }
                    </Box>
                </Box>
            )
        }
        else if (template === 'Template 3') {
            return (
                <Box justifyContent='center' display='flex' className='section-content'>
                    <Box width='80%'>
                        {blogData.map((data, index) => {
                            return (
                                <BlogContentHolder3 key={index} title={data.title} content={data.content} />
                            )
                        })
                        }
                    </Box>
                </Box>
            )
        }
        else if (template === 'Template 4') {
            return (
                <Box justifyContent='center' display='flex' className='section-content'>
                    <Box width='80%'>
                        {blogData.map((data, index) => {
                            return (
                                <BlogContentHolder4 key={index} title={data.title} content={data.content} index={index} />
                            )
                        })
                        }
                    </Box>
                </Box>
            )
        }
        else if (template === 'Custom Colors') {
            return (
                <Box justifyContent='center' display='flex' className='section-content' backgroundColor={`${backgroundColor}`}>
                    <Box width='80%'>
                        {blogData.map((data, index) => {
                            return (
                                <BlogContentCustomColors
                                    key={index}
                                    title={data.title}
                                    content={data.content}
                                    sectionColor={sectionColor}
                                />
                            )
                        })
                        }
                    </Box>
                </Box>
            )
        }
    }

    return (
        <Box className='blogpost-container'>
            <Box className='blog-template'>
                <BlogCover bg={bg} title={"test title"} />
                <BlogIntroduction introTitle={"Introduction"} content={content} />
                {handleTemplate()}
                <BlogPostFooter />
            </Box>
        </Box>
    )
}

export default BlogpostTemplate