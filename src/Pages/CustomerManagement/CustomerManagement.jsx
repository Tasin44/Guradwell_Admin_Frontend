import CustomersTable from './CustomersTable';
import SectionTitle from '../../components/SectionTitle';

const CustomerManagement = () => {
    return (
        <div>
            <SectionTitle title={'Customer Management'} description={'Manage all customer'}/>
            <div className='p-5'>
                <CustomersTable/>
            </div>
        </div>
    );
};

export default CustomerManagement;