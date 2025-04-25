import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      500: "#4299e1", 
      900: "#1a365d",
    },
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  }
})

export default theme