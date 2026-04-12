'use client'

import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

interface AccordionItemProps {
  faq: FAQItem
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
}

function AccordionItem({ faq, index, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)
  const itemId = `faq-item-${index}`
  const panelId = `faq-panel-${index}`

  useGSAP(
    () => {
      const content = contentRef.current
      const chevron = chevronRef.current
      if (!content || !chevron) return

      if (isOpen) {
        // Measure natural height
        gsap.set(content, { height: 'auto', opacity: 1 })
        const fullHeight = content.scrollHeight
        gsap.fromTo(
          content,
          { height: 0, opacity: 0 },
          {
            height: fullHeight,
            opacity: 1,
            duration: 0.28,
            ease: 'power2.out',
            onComplete: () => gsap.set(content, { height: 'auto' }),
          }
        )
        gsap.to(chevron, { rotation: 180, duration: 0.25, ease: 'power2.out' })
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.22,
          ease: 'power2.in',
        })
        gsap.to(chevron, { rotation: 0, duration: 0.22, ease: 'power2.in' })
      }
    },
    { dependencies: [isOpen] }
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onToggle(index)
      }
    },
    [index, onToggle]
  )

  return (
    <article className="border border-neutral-200 bg-white">
      <h2>
        <button
          id={itemId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          onKeyDown={handleKeyDown}
          className={`
            w-full flex items-center justify-between gap-4
            px-6 py-4 text-left cursor-pointer
            text-primary-900 font-semibold text-sm sm:text-base
            transition-colors duration-150
            ${isOpen ? 'bg-neutral-100' : 'hover:bg-neutral-50'}
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          `}
        >
          <span className="flex-1">{faq.question}</span>
          <svg
            ref={chevronRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className="w-5 h-5 shrink-0 text-primary-900"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </h2>

      <div
        id={panelId}
        role="region"
        aria-labelledby={itemId}
        ref={contentRef}
        className="overflow-hidden border-t border-neutral-200"
        style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      >
        <p className="px-6 py-4 text-neutral-700 text-sm sm:text-base leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </article>
  )
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]))

  const handleToggle = useCallback((index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }, [])

  const handleExpandAll = useCallback(() => {
    setOpenIndices(new Set(faqs.map((_, i) => i)))
  }, [faqs])

  const handleCollapseAll = useCallback(() => {
    setOpenIndices(new Set())
  }, [])

  return (
    <div>
      {/* Expand/Collapse All Controls */}
      <div className="flex justify-end gap-6 mb-6">
        <button
          onClick={handleExpandAll}
          className="
            flex items-center gap-2 text-sm font-medium text-primary-500
            transition-colors duration-150 cursor-pointer
            hover:text-primary-600 hover:underline
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          "
          aria-label="Expand all FAQs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className="
            flex items-center gap-2 text-sm font-medium text-primary-500
            transition-colors duration-150 cursor-pointer
            hover:text-primary-600 hover:underline
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          "
          aria-label="Collapse all FAQs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Collapse All
        </button>
      </div>

      {/* FAQs */}
      <section
        aria-label="Frequently Asked Questions"
        className="flex flex-col gap-2"
      >
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            faq={faq}
            index={i}
            isOpen={openIndices.has(i)}
            onToggle={handleToggle}
          />
        ))}
      </section>
    </div>
  )
}
