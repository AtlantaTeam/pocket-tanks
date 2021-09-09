import Enzyme from 'enzyme';

// WARNING!!! Пакет будет deprecated после официальной поддержки React 17 https://github.com/enzymejs/enzyme/issues/2429
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
