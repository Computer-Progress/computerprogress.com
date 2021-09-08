import { Wrapper, Text, Separator, OrderTitle } from "./styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function PaperListItem({
  item,
  index,
  accuracy_list,
  length,
  onSelectAccuracy,
  showOperations,
}) {
  return (
    <>
      {index === 0 && (
        <>
          <Text title center>
            Rank
          </Text>
          <Text title>Model</Text>
          <Text title>Paper</Text>
          {accuracy_list?.map((accuracy, index) => (
            <Text title center hover>
              <a onClick={() => onSelectAccuracy({ option: accuracy, index })}>
                {accuracy.name}
                <ExpandMoreIcon></ExpandMoreIcon>
              </a>
            </Text>
          ))}

          <Text title center>
            Hardware Burden
          </Text>
          {showOperations ? (
            <Text title center>
              Operations Per Network Pass
            </Text>
          ) : null}

          <Text title center>
            Year
          </Text>
          <Separator />
        </>
      )}
      <Text center>{index + 1}</Text>
      <Text>{item.name}</Text>
      <a href={item.paper_link} target="_blank" rel="noreferrer">
        <Text hover link>
          {item.paper_title || "-"}
        </Text>
      </a>
      {accuracy_list?.map((accuracy) => (
        <Text center>{item[accuracy.name] || "-"}</Text>
      ))}
      <Text center>
        {item.hardware_burden ? (
          <>
            10
            <sup>{Math.log10(item.hardware_burden).toFixed(1)}</sup>
          </>
        ) : (
          "-"
        )}
      </Text>
      {showOperations ? (
        <Text center>{item.operation_per_network_pass || "-"}</Text>
      ) : null}

      <Text center>{new Date(item.paper_publication_date).getFullYear()}</Text>
      {index < length - 1 ? <Separator /> : null}
    </>
  );
}
