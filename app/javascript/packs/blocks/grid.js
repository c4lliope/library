import styled from "styled-components"

const Grid = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-column-gap: 1rem;
grid-row-gap: 1rem;

@media(min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
}
`

export default Grid