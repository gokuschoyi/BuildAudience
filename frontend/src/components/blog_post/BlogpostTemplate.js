import { Box } from '@mui/material'
import React from 'react'
import BlogData from './BlogData'
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

    console.log(BlogData.blog_sections[0])
    const handleTemplate = () => {
        if (template === 'Template 1') {
            return (
                <Box justifyContent='center' display='flex' className='section-content'>
                    <Box width='80%'>
                        {BlogData.blog_sections.map((data, index) => {
                            return (
                                <BlogContentHolder1 key={index} content={data} />
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
                        {BlogData.blog_sections.map((data, index) => {
                            return (
                                <BlogContentHolder2 key={index} content={data} />
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
                        {BlogData.blog_sections.map((data, index) => {
                            return (
                                <BlogContentHolder3 key={index} content={data} />
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
                        {BlogData.blog_sections.map((data, index) => {
                            return (
                                <BlogContentHolder4 key={index} content={data} index={index} />
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
                        {BlogData.blog_sections.map((data, index) => {
                            return (
                                <BlogContentCustomColors
                                    key={index}
                                    content={data}
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
                <BlogCover bg={`${BlogData.main_image.image}`} title={BlogData.title} />
                <BlogIntroduction introTitle={"Introduction"} content={BlogData.intro} />
                {handleTemplate()}
                <BlogPostFooter />
            </Box>
        </Box>
    )
}

export default BlogpostTemplate