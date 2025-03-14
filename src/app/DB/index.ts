import config from '../index';
import { USER_ROLE } from '../modules/users/user.constant';
import { User } from '../modules/users/user.model';

const superUser = {
  id: '0001',
  email: 'sehabahmed50100',
  password: config.supe_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async() => {
  //When database is connected, we will check there has any user who is superadmin

  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });

  if(!isSuperAdminExists){
    await User.create(superUser);
  }
}

export default seedSuperAdmin;
