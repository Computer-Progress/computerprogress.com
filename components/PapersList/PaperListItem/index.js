import { Wrapper, Text, Separator } from './styles';

export default function PaperListItem({ item, index, accuracy, accuracy_list, length, onSelectAccuracy }) {
  return (
    <>
        {index === 0 && (
            <>
                <Wrapper accuracy_list={accuracy_list}>
                    <Text title>Rank</Text>
                    <Text title>Model</Text>
                    <Text title>Paper</Text>
                    {accuracy_list?.map((accuracy, index) => (
                        <a onClick={() => onSelectAccuracy(accuracy, index)}>
                            <Text hover title right>{accuracy.name}</Text>
                        </a>
                    ))}
                    <Text title right>Operations Per Network Pass</Text>
                    <Text title right>Hardware Burden</Text>
                    
                    <Text title right>Publication Date</Text>
                </Wrapper>
                <Separator />
            </>
        )}
        <a href={item.paper_link} target="_blank">
            <Wrapper accuracy_list={accuracy_list}>
                <Text>{index + 1}</Text>
                <Text>{item.name}</Text>
                <Text link>{item.paper_title || '-'}</Text>
                {accuracy_list?.map(accuracy => (
                    <Text right>{item[accuracy.name] || '-'}</Text>
                ))}
                <Text right>{item.operation_per_network_pass || '-'}</Text>

                <Text right>
                    {item.hardware_burden ? (
                        <>
                        10
                        <sup>
                            {Math.log10(item.hardware_burden).toFixed(1)}
                        </sup>
                        </>
                    ) : "-"}
                </Text>
                <Text right>{new Date(item.paper_publication_date).getFullYear()}</Text>
            </Wrapper>
        </a>
        {index < length - 1 ? <Separator /> : null}
    </>
  )
}
