import React from 'react'
import { Box, TextField, Button } from '@mui/material'
import Header from '../../../components/global/Header'
import BlogpostTemplate from '../../../components/blog_post/BlogpostTemplate'
import BlogPostEditor from '../../../components/blog_post/blog_post_components/BlogPostEditor'
const DashboardStats = () => {

    function generateShades(colorHex, numShades) {
        const colorRGB = hexToRGB(colorHex);
        const [r, g, b] = colorRGB.match(/\d+/g);
        const shades = [];

        for (let i = 0; i < numShades; i++) {
            const shade = `#${(Math.max(0, r - i * 10)).toString(16).padStart(2, '0').toUpperCase()}${(Math.max(0, g - i * 10)).toString(16).padStart(2, '0').toUpperCase()}${(Math.max(0, b - i * 10)).toString(16).padStart(2, '0').toUpperCase()}`;
            shades.push(shade);
        }
        return shades;
    }

    function hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `rgb(${r}, ${g}, ${b})`;
    }

    const defaultColors = {
        color: '',
        number: 0
    }

    const [colors, setColors] = React.useState(defaultColors)
    const { color, number } = colors;
    const [generatedShades, setGeneratedShades] = React.useState()
    const [palette, setPalette] = React.useState()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setColors({ ...colors, [name]: value });
    }

    const generateColors = () => {
        const colors = generateShades(color, number);
        console.log(colors)
        setGeneratedShades(colors)
        console.log(generatedShades)
    }

    function randomHexColor() {
        // Generate a random integer between 0 and 255
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Convert the integer values to hexadecimal strings and return the concatenated string
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }

    const generatePalette = () => {
        const colors = [];
        for (let i = 0; i < 5; i++) {
            colors.push(randomHexColor());
        }

        let shades = [];
        for (let i = 0; i < colors.length; i++) {
            shades.push(generateShades(colors[i], 5));
        }
        setPalette(shades);
    }
    /* console.log(palette) */

    /* generate shades from the palette */

    const [template, setTemplate] = React.useState('Template 1')
    const handleChange = (e) => {
        const { value } = e.target;
        setTemplate(value)
    }

    const [sectionColor, setSectionColor] = React.useState('#fff')
    const handleSectionColorChange = (color) => {
        setSectionColor(color.hex)
    }

    const [backgroundColor, setBackgroundColor] = React.useState('#fff')
    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color.hex)
    }

    return (
        <Box>
            <Box height='100%' width='-webkit-fill-available'>
                <Header title={"Dashboard"} subtitle={"View your stats"} />
            </Box>
            <Box>
                <Box>
                    <TextField
                        label="Enter color in hex"
                        id="standard-size-small"
                        placeholder='enter color in hex'
                        size="small"
                        variant="standard"
                        sx={{ margin: '20px' }}
                        name='color'
                        value={color}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Enter no of colors to generate"
                        id="standard-size-small"
                        placeholder='enter no of colors to generate'
                        size="small"
                        variant="standard"
                        sx={{ margin: '20px' }}
                        name='number'
                        value={number}
                        onChange={handleInputChange}
                    />
                    <Button variant="outlined" href="#outlined-buttons" onClick={generateColors}>
                        Submit
                    </Button>
                </Box>
                <Box display='flex'>
                    {generatedShades && generatedShades.map((shade, index) => {
                        return (
                            <Box key={index} sx={{ backgroundColor: shade, width: '100px', height: '100px', margin: '10px' }}>

                            </Box>
                        )
                    })
                    }
                </Box>
            </Box>
            <Box p={3}>
                <Button variant="outlined" href="#outlined-buttons" onClick={generatePalette}>
                    Regenerate
                </Button>
                {palette && palette.map((color, index) => {
                    return (
                        <Box key={index} sx={{ display: 'flex' }}>
                            {color.map((shade, index) => {
                                return (
                                    <Box key={index} sx={{ backgroundColor: shade, width: '100px', height: '100px', margin: '10px' }}>

                                    </Box>
                                )
                            })}
                        </Box>
                    )
                })
                }
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
                sx={{ maxHeight: '100vh', overflowY: 'scroll', borderStyle:'solid', borderColor:'neutral.dark'  }}
                padding={3}
            >
                <BlogpostTemplate template={template} backgroundColor={backgroundColor} sectionColor={sectionColor} />
            </Box>
        </Box>
    )
}

export default DashboardStats