import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Panel from '../';

jest.mock('../../utils/config');

const location = {
  pathname: '/0.2.5/',
  hash: '',
  search: '',
};

describe('Panel', () => {
  it('Panel renders correctly, no versions (dev true)', () => {
    const storybook = {
      getQueryParam: () => 'true',
      setQueryParams: () => {},
    };

    const tree = renderer
      .create(<Panel storybook={storybook} location={location} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Panel renders correctly, no versions (dev false)', () => {
    const storybook = {
      getQueryParam: () => 'false',
      setQueryParams: () => {},
    };

    const tree = renderer
      .create(<Panel storybook={storybook} location={location} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Panel renders versions (dev false)', async () => {
    const storybook = {
      getQueryParam: () => 'false',
      setQueryParams: () => {},
    };

    const wrapper = await shallow(<Panel storybook={storybook} location={location} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('Panel renders versions (dev true)', async () => {
    const storybook = {
      getQueryParam: () => 'true',
      setQueryParams: () => {},
    };

    const wrapper = await shallow(<Panel storybook={storybook} location={location} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('Toggles dev mode', async () => {
    const storybook = {
      getQueryParam: () => 'true',
      setQueryParams: () => {},
    };

    const wrapper = await shallow(<Panel storybook={storybook} location={location} />);
    const linksFound = wrapper.find('button').length;
    wrapper.find('#versionsAddonDevMode').simulate('change');
    expect(wrapper.find('button').length).toBe(linksFound - 1);
    wrapper.find('#versionsAddonDevMode').simulate('change');
    expect(wrapper.find('button').length).toBe(linksFound);
  });
});
