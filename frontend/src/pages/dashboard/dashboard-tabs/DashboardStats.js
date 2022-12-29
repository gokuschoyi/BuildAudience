import React, { useState, useEffect } from 'react'
import { Box, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material'
import axios from 'axios'
import Header from '../../../components/global/Header'
import BlogpostTemplate from '../../../components/blog_post/BlogpostTemplate'
import BlogPostEditor from '../../../components/blog_post/blog_post_components/BlogPostEditor'
import ImageEditor from '../../../components/custom_post/image_editor/ImageEditor'
const DashboardStats = () => {
    const [templateUrl, setTemplateUrl] = useState([])
    const [templateType, setTemplateType] = useState('facebook')
    const [selectedTemplateUrl, setSelectedTemplateUrl] = useState('')
    const [selectedTemplateName, setSelectedTemplateName] = useState('')

    const postTypeHandleChange = (e) => {
        const { value } = e.target;
        setTemplateType(value)
    }

    const handleSelectedTemplate = (e, obj) => {
        const target = obj.props;
        /* console.log(target) */
        const value = target.value
        const name = target.children
        setSelectedTemplateUrl(value)
        setSelectedTemplateName(name)
    }

    const [template, setTemplate] = useState('Template 1')
    const handleChange = (e) => {
        const { value } = e.target;
        setTemplate(value)
    }

    const [sectionColor, setSectionColor] = useState('#fff')
    const handleSectionColorChange = (color) => {
        setSectionColor(color.hex)
    }

    const [backgroundColor, setBackgroundColor] = useState('#fff')
    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color.hex)
    }

    useEffect(() => {
        const getTemplates = (templateType) => {
            setTemplateUrl([])
            const Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MjExNDMwNCwianRpIjoiODE3NzIzNTYtNWNmYy00YjVkLTg1NzYtM2Y4YmU4N2Q3YzcxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1aWQiOiJFWGk2Nk1FTzQ1VXNGbW1KSGE0UEthMHJRTWkyIiwiZW1haWwiOiJnb2t1bFNjaG95aUBnbWFpbC5jb20iLCJjb21wYW55X25hbWUiOiJCdXp6IiwiZGlzcGxheV9uYW1lIjoiR29rdWwifSwibmJmIjoxNjcyMTE0MzA0fQ.OwGDu284bApsVqORqnL5f_DU7wGx-eem69BgFwvXh0w'
            const config = {
                headers: { Authorization: `Bearer ${Token}` }
            }
            const data = {
                'template_type': templateType
            }
            axios.post('http://localhost:9000/image_post/template_url', data, config, { withCredentials: true })
                .then(res => {
                    setTemplateUrl(res.data)
                    // console.log(templateUrl.data[0])
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (templateType === 'facebook') {
            getTemplates("facebook")
        }
        if (templateType === 'instagram') {
            getTemplates("instagram")
        }
        if (templateType === 'story') {
            getTemplates("story")
        }
    }, [templateType])

    useEffect(() => {
        if (templateUrl.length !== 0) {
            if (templateUrl.data.length > 0) {
                /* console.log("linkstore") */
                setSelectedTemplateUrl(templateUrl.data[0].url)
                setSelectedTemplateName(templateUrl.data[0].value)
            }
        }
    }, [templateUrl])

    return (
        <Box>
            <Box height='100%' width='-webkit-fill-available'>
                <Header title={"Dashboard"} subtitle={"View your stats"} />
            </Box>

            <Box pr={2} display='flex'>
                <FormControl sx={{ m: 3, minWidth: 150 }} size="small">
                    <InputLabel id="demo-select-small">Post Type</InputLabel>
                    <Select
                        labelId="demo-select-small-post"
                        id="demo-select-small-post"
                        value={templateType}
                        label="Select Post"
                        onChange={postTypeHandleChange}
                    >
                        <MenuItem value='facebook'>Facebook</MenuItem>
                        <MenuItem value='instagram'>Instagram</MenuItem>
                        <MenuItem value='story'>Story</MenuItem>
                    </Select>
                </FormControl>
                {templateUrl.length === 0
                    ?
                    <Box display='flex' alignItems='center'>
                        <CircularProgress size='20px' />
                    </Box>
                    :
                    <FormControl sx={{ m: 3, minWidth: 150 }} size="small">
                        <InputLabel id="demo-select-small">Template</InputLabel>
                        <Select
                            labelId="demo-select-small-template"
                            id="demo-select-small-template"
                            value={selectedTemplateUrl}
                            label="Select Template"
                            onChange={handleSelectedTemplate}
                        >
                            <MenuItem value={selectedTemplateUrl}>Default</MenuItem>
                            {
                                templateUrl.data.map((item, key) => {
                                    return <MenuItem key={key} value={item.url} id={selectedTemplateName}>{item.value}</MenuItem>
                                }
                                )
                            }
                        </Select>
                    </FormControl>
                }
            </Box>
            {/* {templateUrl.length === 0
                ?
                <Box display='flex' alignItems='center'>
                    <CircularProgress size='20px' />
                </Box>
                :
                <Box>
                    {templateUrl.data.map((item, key) => {
                        return <img key={key} src={item.url} alt={key}></img>
                    }
                    )}
                </Box>
            } */}


            <Box className='ImageEditor' display='flex' justifyContent='center' width='100%'>
                <Box width='80%'>
                    <ImageEditor templateUrl={selectedTemplateUrl} templateType={templateType} templateName={selectedTemplateName} />
                </Box>
            </Box>

            <BlogPostEditor
                template={template}
                handleChange={handleChange}
                sectionColor={sectionColor}
                handleSectionColorChange={handleSectionColorChange}
                backgroundColor={backgroundColor}
                handleBackgroundColorChange={handleBackgroundColorChange}
            />
            <Box
                className='template-holder'
                display='flex'
                flexDirection='column'
                height='100vh'
                sx={{ maxHeight: '100vh', overflowY: 'scroll', borderStyle: 'solid', borderColor: 'neutral.dark' }}
                padding={3}
            >
                <BlogpostTemplate template={template} backgroundColor={backgroundColor} sectionColor={sectionColor} />
            </Box>
        </Box>
    )
}

export default DashboardStats