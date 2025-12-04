import type { IAccordionItemProps } from '@/components/ui/accordion'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native'
import { View } from 'react-native'
import { AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/utils'

export interface MyAccordionItemProps extends IAccordionItemProps {
  children: React.ReactNode
  title: string
}

export function MyAccordionItem(props: MyAccordionItemProps) {
  const { title, children, ...rest } = props

  return (
    <AccordionItem {...rest}>
      <AccordionHeader>
        <AccordionTrigger className="p-0">
          {({ isExpanded }: { isExpanded: boolean }) => {
            return (
              <View className={cn(
                'py-3 px-4 w-full flex-row justify-between items-center',
                isExpanded ? 'border-b border-outline-100' : '',
              )}
              >
                <AccordionTitleText>
                  {title}
                </AccordionTitleText>
                {isExpanded
                  ? (
                      <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                    )
                  : (
                      <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                    )}
              </View>
            )
          }}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className="pt-3">
        {children}
      </AccordionContent>
    </AccordionItem>
  )
}
