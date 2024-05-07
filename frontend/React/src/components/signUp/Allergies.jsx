import React, { useState, useEffect, useRef } from 'react';

function Allergies(props) {
    const [userInput, setUserInput] = useState('');
    const [isMatch, setIsMatch] = useState(false); //not needed
    const [allergens, setAllergens] = useState([]);
    const prevAllergens = useRef([]);

    function handelInputChange(event) {
        const { value } = event.target;
        setUserInput(value.toLowerCase());
        setIsMatch(false);
        props.error(false);
    }

    function handleAdd(event) {
        if (allergens.includes(userInput)) {
            setIsMatch(true);
            props.error("Allergen already added");
            setUserInput("");
        } else {
            setIsMatch(false);
            setAllergens(prevAllergens => [...prevAllergens, userInput.toLocaleLowerCase()]);
            setUserInput('');
        }
    }

    function handleRemove(allergenToRemove) {
        setAllergens(prevAllergens => prevAllergens.filter(allergen => allergen !== allergenToRemove));
    }

    useEffect(() => {
        // Check if allergens have changed
        if (JSON.stringify(prevAllergens.current) !== JSON.stringify(allergens)) {
            prevAllergens.current = allergens; // Update the previous value
            props.obj({ allergens });
        }
    }, [allergens, props]);

    return (
        <div>
            <h3>What are you allergic to?</h3>
            <div id="allergenInputContainer">
                <input type="text" id="allergenInput" placeholder="wheat" list="allergens_list" value={userInput} onChange={handelInputChange}/>
                <input type="text" id="fakeInput" placeholder="wheat" value={userInput}/>
                <button type="button" id="addAllergenBtn" onClick={handleAdd}><img src="./../../../public/resources/add_recipe_icon.svg" alt="Add" id="addAllergenIcon"/></button>
            </div>
            <div id="displayDiv">
                {allergens.map(allergen => (
                    <React.Fragment key={allergen}>
                        <button onClick={() => handleRemove(allergen)} className="allergenBtn">{allergen}</button>
                    </React.Fragment>
                ))}
            </div>
            <datalist id="allergens_list">
                <option value="wheat"></option>
                <option value="eggs"></option>
                <option value="peanuts"></option>
                <option value="soybeans"></option>
                <option value="milk"></option>
                <option value="fish"></option>
                <option value="shellfish"></option>
                <option value="tree nuts"></option>
                <option value="sesame seeds"></option>
                <option value="mustard"></option>
                <option value="celery"></option>
                <option value="lupin"></option>
                <option value="sulfites"></option>
                
                <option value="almonds"></option>
                <option value="hazelnuts"></option>
                <option value="pecans"></option>
                <option value="cashews"></option>
                <option value="pistachios"></option>
                <option value="brazil nuts"></option>
                <option value="walnuts"></option>
                <option value="macadamia nuts"></option>
                <option value="pine nuts"></option>
                <option value="chestnuts"></option>
                <option value="sesame"></option>
                <option value="poppy seeds"></option>
                <option value="kiwi"></option>
                <option value="banana"></option>
                <option value="melon"></option>
                <option value="strawberry"></option>
                <option value="pineapple"></option>
                <option value="mango"></option>
                <option value="papaya"></option>
                <option value="passion fruit"></option>
                <option value="apple"></option>
                <option value="pear"></option>
                <option value="peach"></option>
                <option value="plum"></option>
                <option value="apricot"></option>
                <option value="cherry"></option>
                <option value="avocado"></option>
                <option value="fig"></option>
                <option value="raspberry"></option>
                <option value="blackberry"></option>
                <option value="blueberry"></option>
                <option value="gooseberry"></option>
                <option value="cranberry"></option>
                <option value="currant"></option>
                <option value="coconut"></option>
                <option value="chocolate"></option>
                <option value="coffee"></option>
                <option value="tea"></option>
                <option value="wine"></option>
                <option value="beer"></option>
                <option value="spirits"></option>
                <option value="liqueurs"></option>
                <option value="cider"></option>
                <option value="meat"></option>
                <option value="poultry"></option>
                <option value="beef"></option>
                <option value="pork"></option>
                <option value="lamb"></option>
                <option value="venison"></option>
                <option value="game meats"></option>
                <option value="rabbit"></option>
                <option value="boar"></option>
                <option value="duck"></option>
                <option value="goose"></option>
                <option value="turkey"></option>
                <option value="chicken"></option>
                <option value="quail"></option>
                <option value="pigeon"></option>
                <option value="veal"></option>
                <option value="honey"></option>
                <option value="yeast"></option>
                <option value="gluten"></option>
                <option value="monosodium glutamate (MSG)"></option>
                <option value="sulphur dioxide and sulphites"></option>
                <option value="artificial colors"></option>
                <option value="artificial flavors"></option>
                <option value="sunflower seeds"></option>
                <option value="pumpkin seeds"></option>
                <option value="quinoa"></option>
                <option value="amaranth"></option>
                <option value="buckwheat"></option>
                <option value="millet"></option>
                <option value="rye"></option>
                <option value="barley"></option>
                <option value="oats"></option>
                <option value="corn"></option>
                <option value="rice"></option>
                <option value="sweet potato"></option>
                <option value="potato"></option>
                <option value="tomato"></option>
                <option value="bell pepper"></option>
                <option value="chili pepper"></option>
                <option value="eggplant"></option>
                <option value="cucumber"></option>
                <option value="zucchini"></option>
                <option value="squash"></option>
                <option value="carrot"></option>
                <option value="beetroot"></option>
                <option value="spinach"></option>
                <option value="kale"></option>
                <option value="lettuce"></option>
                <option value="cabbage"></option>
                <option value="broccoli"></option>
                <option value="cauliflower"></option>
                <option value="brussels sprouts"></option>
                <option value="turnip"></option>
                <option value="parsnip"></option>
                <option value="rutabaga"></option>
                <option value="radish"></option>
                <option value="asparagus"></option>
                <option value="artichoke"></option>
                <option value="celeriac"></option>
                <option value="fennel"></option>
                <option value="leek"></option>
                <option value="onion"></option>
                <option value="garlic"></option>
                <option value="ginger"></option>
                <option value="turmeric"></option>
                <option value="cinnamon"></option>
                <option value="nutmeg"></option>
                <option value="clove"></option>
                <option value="cardamom"></option>
                <option value="anise"></option>
                <option value="fennel seed"></option>
                <option value="caraway"></option>
                <option value="coriander"></option>
                <option value="cumin"></option>
                <option value="fenugreek"></option>
                <option value="mustard seed"></option>
                <option value="paprika"></option>
                <option value="black pepper"></option>
                <option value="white pepper"></option>
                <option value="cayenne pepper"></option>
                <option value="horseradish"></option>
                <option value="wasabi"></option>
                <option value="vanilla"></option>
                <option value="rosemary"></option>
                <option value="thyme"></option>
                <option value="oregano"></option>
                <option value="basil"></option>
                <option value="parsley"></option>
                <option value="mint"></option>
                <option value="dill"></option>
                <option value="sage"></option>
                <option value="bay leaf"></option>
                <option value="tarragon"></option>
                <option value="chervil"></option>
                <option value="chive"></option>
                <option value="citrus fruits"></option>
                <option value="grapes"></option>
                <option value="figs"></option>
                <option value="dates"></option>
                <option value="prunes"></option>
                <option value="persimmons"></option>
                <option value="kiwifruit"></option>
                <option value="plantains"></option>
                <option value="starfruit"></option>
                <option value="guava"></option>
                <option value="dragon fruit"></option>
                <option value="lychee"></option>
                <option value="rambutan"></option>
                <option value="pomegranate"></option>
                <option value="passion fruit"></option>
                <option value="durian"></option>
                <option value="jackfruit"></option>
                <option value="breadfruit"></option>
                <option value="soursop"></option>
                <option value="custard apple"></option>
                <option value="cherimoya"></option>
                <option value="carambola"></option>
                <option value="loquat"></option>
                <option value="mulberry"></option>
                <option value="black currant"></option>
                <option value="red currant"></option>
                <option value="white currant"></option>
                <option value="goji berry"></option>
                <option value="kiwi berry"></option>
                <option value="boysenberry"></option>
                <option value="loganberry"></option>
                <option value="cloudberry"></option>
                <option value="elderberry"></option>
                <option value="huckleberry"></option>
                <option value="gooseberry"></option>
                <option value="blue honeysuckle"></option>
                <option value="sea buckthorn"></option>
                <option value="aronia"></option>
                <option value="juniper berry"></option>
            </datalist>
        </div>
    )
}

export default Allergies;