import React from 'react';
import '@testing-library/jest-dom';

import { shallow } from 'enzyme';
import { MainScreen } from '../../../components/main/MainScreen';

describe('Test in <MainScreen />', () => {
    const wrapper = shallow(<MainScreen />);

    test('It should show the <MainScreen /> component correctly ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Should simulate search bar input', () => {
        const input = wrapper.find('.search-input');
        const value = 'Milky Shake';
        input.simulate('change', { target: { value } });
    });
});
