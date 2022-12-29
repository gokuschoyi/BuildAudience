import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, CircularProgress } from '@mui/material';
import FilerobotImageEditor, {
    TABS,
    TOOLS,
} from 'react-filerobot-image-editor';
import facebookBg from '../../../assets/white-mask-facebook.png';
import instagramBg from '../../../assets/white-mask-instagram.png';
import storyBg from '../../../assets/white-mask-story.png';

function ImageEditor(props) {
    const { templateUrl, templateType, templateName } = props
    const [src, setSrc] = useState('');
    const [resetButton, setResetButton] = useState([]);
    const [continueButton, setContinueButton] = useState([]);
    const [options, setOptions] = useState([]);


    useEffect(() => {
        if (templateUrl !== '') {
            setSrc(templateUrl)
        }
    }, [templateUrl])

    const reset = () => {
        /* console.log('continue button clicked') */
        setSrc(templateUrl);
        setResetButton([])
        setContinueButton([])
    }
    /* console.log("from editor",templateUrl) */
    /* console.log({ templateUrl, src }) */
    console.log(templateName)

    useEffect(() => {
        setResetButton(document.getElementsByClassName('FIE_topbar-reset-button'))
    }, [resetButton])

    /* console.log(resetButton) */

    useEffect(() => {
        const timeout = setTimeout(() => {
            var optionsList = document.getElementsByClassName('FIE_tools-bar')
            /* console.log(optionsList) */
            setOptions(Array.from(optionsList[0].childNodes))
            clearTimeout(timeout)
        }, 7000)
    }, [])

    useEffect(() => {
        if (options.length !== 0) {
            var hide = ["sc-dwg14p-2 cHPFPE FIE_image-tool-button", "sc-dwg14p-2 cHPFPE FIE_pen-tool-button", "sc-dwg14p-2 cHPFPE FIE_line-tool-button", "sc-dwg14p-2 cHPFPE FIE_arrow-tool-button"]
            /* console.log(options) */
            options.map(tool => {
                var flag = false
                if (hide.includes(`${tool.className}`)) {
                    tool.style.display = 'none'
                    flag = true
                }
                return flag
            })
        }
    }, [options])

    /* console.log(options) */

    useEffect(() => {
        if (resetButton.length > 0) {
            /* console.log('reset button found') */
            resetButton[0].addEventListener('click', () => {
                const timeout = setTimeout(() => {
                    setContinueButton(document.getElementsByClassName('SfxButton-root fChmtv'))
                    clearTimeout(timeout)
                }, 300)
            })
        }
    }, [continueButton, resetButton])

    /* console.log(continueButton) */

    useEffect(() => {
        if (continueButton.length > 0) {
            /* console.log('continue button found') */
            continueButton[0].addEventListener('click', reset)
        }
        else {
            /* console.log('continue button not found') */
        }
    }, [continueButton, resetButton])

    const beforeSave = ((props) => {
        console.log('before save', props)
        if (templateType === 'facebook') { setSrc(`${facebookBg}`) }
        if (templateType === 'instagram') { setSrc(`${instagramBg}`) }
        if (templateType === 'story') { setSrc(`${storyBg}`) }
    })

    const save = (async (editedImageObject, designState) => {
        console.log('saved')
        var base64 = editedImageObject.imageBase64.split(",")[1]
        /* console.log(base64) */

        var imageData = {
            annotation: designState.annotations,
            base64Image: base64,
            quote: 'This is mr bombastic',
            p_name: 'Gokul',
            url: 'https://images.unsplash.com/photo-1468927201227-35e86293a0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODcwNTl8MHwxfHNlYXJjaHwxfHxDcm9jaGV0aW5nfGVufDB8fHx8MTY0NzQ5NzAwMQ&ixlib=rb-1.2.1&q=80&w=1080',
            type: 'facebook',
            template_name:templateName
        }
        console.log(imageData)
        const Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MjExNDMwNCwianRpIjoiODE3NzIzNTYtNWNmYy00YjVkLTg1NzYtM2Y4YmU4N2Q3YzcxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1aWQiOiJFWGk2Nk1FTzQ1VXNGbW1KSGE0UEthMHJRTWkyIiwiZW1haWwiOiJnb2t1bFNjaG95aUBnbWFpbC5jb20iLCJjb21wYW55X25hbWUiOiJCdXp6IiwiZGlzcGxheV9uYW1lIjoiR29rdWwifSwibmJmIjoxNjcyMTE0MzA0fQ.OwGDu284bApsVqORqnL5f_DU7wGx-eem69BgFwvXh0w'
        const config = {
            headers: { Authorization: `Bearer ${Token}` }
        }

        await axios.post('http://localhost:9000/image_post/custom_mask', imageData, config, { withCredentials: true })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    })

    return (
        <Box className='ImageEditor' style={{ height: '500px', width: '100%' }}>
            {src === ''
                ?
                <Box display='flex' alignItems='center'>
                    <CircularProgress size='20px' />
                </Box>
                :
                <FilerobotImageEditor
                    source={src}
                    onBeforeSave={(props) => {
                        beforeSave(props)
                    }}
                    onSave={(editedImageObject, designState) => {
                        save(editedImageObject, designState)
                    }}
                    /* onClose={closeImgEditor} */
                    annotationsCommon={{
                        fill: '#ff0000ff',
                    }}
                    Text={{ text: 'Filerobot...' }}
                    Rotate={{ angle: 90, componentType: 'slider' }}
                    Crop={{
                        presetsItems: [
                            {
                                titleKey: 'classicTv',
                                descriptionKey: '4:3',
                                ratio: 4 / 3,
                                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                            },
                            {
                                titleKey: 'cinemascope',
                                descriptionKey: '21:9',
                                ratio: 21 / 9,
                                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                            },
                        ],
                        presetsFolders: [
                            {
                                titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                                groups: [
                                    {
                                        titleKey: 'facebook',
                                        items: [
                                            {
                                                titleKey: 'profile',
                                                width: 180,
                                                height: 180,
                                                descriptionKey: 'fbProfileSize',
                                            },
                                            {
                                                titleKey: 'coverPhoto',
                                                width: 820,
                                                height: 312,
                                                descriptionKey: 'fbCoverPhotoSize',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    }}
                    tabsIds={[TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
                    defaultTabId={TABS.ANNOTATE} // or 'Annotate'
                    defaultToolId={TOOLS.ANNOTATE} // or 'Text'
                    observePluginContainerSize={true}
                />
            }
        </Box>
    );
}

export default ImageEditor;