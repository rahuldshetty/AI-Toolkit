import {
    Home,
    VoiceActivate,
    StringText,
} from "carbon-icons-svelte";

export const SideNavItemsData = [
    { 
        "name": "Home",
        "type": "item",
        "icon": Home,
        "link": "/"
    },
    { 
        "name": "Text",
        "type": "group",
        "icon": StringText,
        "children": [
            {
                "name": "Text Generation",
                "type": "item",
                "link": "/models/text/generation"
            },
        ]
    },
    { 
        "name": "Audio",
        "type": "group",
        "icon": VoiceActivate,
        "children": [
            {
                "name": "Speech-to-Text (STT)",
                "type": "item",
                "link": "/models/audio/stt"
            },
            { 
                "name": "Text-to-Speech (TTS)",
                "type": "item",
                "link": "/models/audio/tts"
            },
        ]
    },
]