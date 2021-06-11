import { Wrapper, Text, Separator } from './styles';

export default function PaperListItem({ item, index, accuracy, length }) {
  return (
    <>
        {index === 0 && (
            <>
                <Wrapper>
                    <Text title>Rank</Text>
                    <Text title>Model</Text>
                    <Text title>Paper</Text>
                    <Text title>{accuracy}</Text>
                    <Text title right>Hardware Burden</Text>
                    <Text title right>Publication Date</Text>
                </Wrapper>
                <Separator />
            </>
        )}
        <Wrapper>
            <Text>000</Text>
            <Text>{item.model}</Text>
            <Text link>{item.model}</Text>
            <Text>{item.accuracy}</Text>
            <Text right>{item.hardware_burden}</Text>
            <Text right>{item.year}</Text>
        </Wrapper>
        {index < length - 1 ? <Separator /> : null}
    </>
  )
}
