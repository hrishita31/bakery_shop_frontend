import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import { useState } from "react";

export const RatingFunc = () => {
    const[rate, setRate] = useState(0);
    return(
        <Container>
            {[...Array(5)].map(( _ , index) => {
                const givenRating = index + 1;
                return (
                    <div key={index}>
                    <label>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                
                                setRate(givenRating);
                            }}
                        />
                        <Rating>
                            <FaStar
                                color={
                                    givenRating < rate || givenRating === rate
                                        ? "rgb(226, 232, 65)"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rating>
                    </label>
                    </div>
                );
            })}
        </Container>
    )
};

export default RatingFunc;


