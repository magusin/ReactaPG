import { motion } from 'framer-motion'
import { Box } from '@mui/material'

type Letter = {
  letter: string;
  color: string;
};

interface AnimatedTextProps {
    letters: Letter[]
}

const AnimatedText = ({ letters }: AnimatedTextProps) => {
    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
    const transition = { duration: 0.03 }
  
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {letters.map(({ letter, color }, index) => (
          <motion.span
            key={index}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.03 * index }}
            style={{ color }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </Box>
    )
  }

export default AnimatedText