import { motion } from "motion/react";

/**
 * BlurredStagger (21st.dev, ruixen.ui/text-reveal-faqs) – nur die Animation:
 * jedes Zeichen blendet einzeln mit leichtem Blur ein, sobald `show` aktiv
 * wird (statt fest beim Mount wie im Original, damit ein Accordion-Eintrag
 * bei jedem erneuten Öffnen neu einblendet).
 */
export function BlurredStagger({ text, show }: { text: string; show: boolean }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.015 },
    },
  };

  const letter = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      className="text-sm leading-relaxed break-words whitespace-normal text-muted-foreground"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letter}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.p>
  );
}
