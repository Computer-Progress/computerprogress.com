import { Wrapper, Info, StyledChip, Details, SmallDetails } from './styles'

export default ({ paper }) => {
    return (
        <Wrapper>
            <h2>{paper.name}</h2>
            <Details>
                {paper.models.map(item => (
                    <StyledChip label={item} />
                ))}
            </Details>
            {paper.submitted_by ? (
                <SmallDetails>
                    <Info>Submitted by: {paper.submitted_by}</Info>
                    <Info right>Last update {paper.last_update}. {paper.status}</Info>
                </SmallDetails>
            ) : (
                <Info right>Last update {paper.last_update}. {paper.status}</Info>
            )}
        </Wrapper>
    )
}