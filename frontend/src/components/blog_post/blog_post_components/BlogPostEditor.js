import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import { GithubPicker } from 'react-color';

const BlogPostEditor = (props) => {
    const {
        template,
        handleChange,
        sectionColor,
        handleSectionColorChange,
        backgroundColor,
        handleBackgroundColorChange,
    } = props

    const [sectionColorSwitch, setSectionColorSwitch] = React.useState(false)
    const [backgroundColorSwitch, setBackgroundColorSwitch] = React.useState(false)

    console.log(template)

    const handleSectionColorSwitch = () => {
        setSectionColorSwitch(!sectionColorSwitch)
        setBackgroundColorSwitch(false)
    }

    const handleBackgroundColorSwitch = () => {
        setBackgroundColorSwitch(!backgroundColorSwitch)
        setSectionColorSwitch(false)
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }

    return (
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            p={3}
        >
            <Box display='flex' alignItems='center'>
                <Box pr={2}>
                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                        <InputLabel id="demo-select-small">Select Template</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={template}
                            label="Select Template"
                            onChange={handleChange}
                        >
                            <MenuItem value='Template 1'>Template 1</MenuItem>
                            <MenuItem value='Template 2'>Template 2</MenuItem>
                            <MenuItem value='Template 3'>Template 3</MenuItem>
                            <MenuItem value='Template 4'>Template 4</MenuItem>
                            <MenuItem value='Custom Colors'>Custom Colors</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {template === 'Custom Colors'
                    ?
                    <Box display='flex'>
                        <Box alignContent='center'>
                            <Tooltip title='Change Section Color'>
                                <IconButton
                                    onClick={handleSectionColorSwitch}
                                >
                                    <FormatColorFillOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            {sectionColorSwitch ?
                                <Box sx={popover} className='popover'>
                                    <GithubPicker
                                        color={sectionColor}
                                        onChangeComplete={handleSectionColorChange}
                                    />
                                </Box>
                                : null
                            }
                        </Box>

                        <Box alignContent='center'>
                            <Tooltip title='Change Background Color of the main section'>
                                <IconButton
                                    onClick={handleBackgroundColorSwitch}
                                >
                                    <FormatColorFillOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            {backgroundColorSwitch ?
                                <Box sx={popover} className='popover'>
                                    <GithubPicker
                                        color={backgroundColor}
                                        onChangeComplete={handleBackgroundColorChange}
                                    />
                                </Box>
                                : null
                            }
                        </Box>
                    </Box>
                    : null
                }
            </Box>
            <Box alignContent='center'>
                <IconButton>
                    <SaveOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default BlogPostEditor