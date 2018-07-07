import CleanLayout from '../layouts/Clean/CleanLayout';
import cleanRoutes from '../routes/clean';
import CommonLayout from '../layouts/Common/CommonLayout';
import commonRoutes from '../routes/common';

const indexRoutes = Array.prototype.concat(
  cleanRoutes.map(route => Object.assign({ layout: CleanLayout }, route)),
  commonRoutes.map(route => Object.assign({ layout: CommonLayout }, route)),
);

export default indexRoutes;
