import { extendTheme } from '@chakra-ui/react';

const theme = {
    colors: {
        brand: {
            100: "#f7fafc",
            // ... other color shades
            900: "#1a202c",
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold', // Normally, it is "semibold"
                backgroundColor: '#000',
            },
        },
    },
};


export default extendTheme(theme);