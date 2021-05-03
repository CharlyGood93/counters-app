import React from 'react';
import { shallow } from "enzyme";
import { WelcomeScreen } from "../../../components/welcome/WelcomeScreen";

const wrapper = shallow(<WelcomeScreen />);
const textToCompare = 'Welcome to Counters';

describe('Test in <WelcomeScreen />', () => {
    test('Should show the <WelcomeScreen /> component correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('Should have the title Welcome to Counters', () => {
       const title = wrapper.find('h4.color-text');
       expect(title.props('strong').children.props.children).toBe(textToCompare); 
    });
});
