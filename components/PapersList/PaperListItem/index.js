import { Wrapper, Text, Separator } from './styles';

export default function PaperListItem({
    item,
    index,
    accuracy_list,
    length,
    onSelectAccuracy,
    showOperations
}) {
  return (
    <>
        {index === 0 && (
            <>
                <Wrapper accuracy_list={accuracy_list} showOperations={showOperations}>
                    <Text title>Rank</Text>
                    <Text title>Model</Text>
                    <Text title>Paper</Text>
                    {accuracy_list?.map((accuracy, index) => (
                        <a onClick={() => onSelectAccuracy({option: accuracy, index})}>
                            <Text title right hover>{accuracy.name}</Text>
                        </a>
                    ))}

                    {showOperations ? (
                        <Text title right>Operations Per Network Pass</Text>
                    ) : null}
                    <Text title right>Hardware Burden</Text>
                    
                    <Text title right>Year</Text>
                </Wrapper>
                <Separator />
            </>
        )}
        <a href={item.paper_link} target="_blank">
            <Wrapper accuracy_list={accuracy_list} showOperations={showOperations}>
                <Text>{index + 1}</Text>
                <Text>{item.name}</Text>
                <Text link>{item.paper_title || '-'}</Text>
                {accuracy_list?.map(accuracy => (
                    <Text right>{item[accuracy.name] || '-'}</Text>
                ))}
                {showOperations ? (
                    <Text right>{item.operation_per_network_pass || '-'}</Text>
                ) : null}

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
