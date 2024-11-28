import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { EmailCodeComponent } from './user/email-code/email-code.component';
import { LoginComponent } from './user/login/login.component';
import { ProductComponent } from './dashboard/product/product.component';
import { authGuard } from './shared/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserInforComponent } from './dashboard/user-infor/user-infor.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './user/new-password/new-password.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { AdminComponent } from './admin/admin.component';
import { ManageProductComponent } from './admin/manage-product/manage-product.component';
import { ManageAccountComponent } from './admin/manage-account/manage-account.component';
import { ManageOrderComponent } from './admin/manage-order/manage-order.component';
import { ManageProductSoldoutComponent } from './admin/manage-product-soldout/manage-product-soldout.component';
import { ManageBlockAccountComponent } from './admin/manage-block-account/manage-block-account.component';
import { CartComponent } from './cart/cart.component';
import { ManageOrderDetailComponent } from './admin/manage-order-detail/manage-order-detail.component';
import { ManageRejectoderComponent } from './admin/manage-rejectoder/manage-rejectoder.component';
import { ManageApproveoderComponent } from './admin/manage-approveoder/manage-approveoder.component';
import { OrderComponent } from './dashboard/order/order.component';
import { ProductDetailComponent } from './dashboard/product-detail/product-detail.component';
import { ProductByCategoryComponent } from './dashboard/product-by-category/product-by-category.component';



export const routes: Routes = [{
     path: 'user', component: UserComponent,
     children: [
          { path: 'register', component: RegisterComponent },
          { path: 'login', component: LoginComponent },
          { path: 'confirmEmail', component: EmailCodeComponent },
          { path: 'forgotPassword', component: ForgotPasswordComponent },
          { path: 'updatePassword', component: NewPasswordComponent },

     ]
},
{
     path: 'admin', component: AdminComponent,
     children: [
          { path: 'manageProduct', component: ManageProductComponent },
          { path: 'manageProductSoldOut', component: ManageProductSoldoutComponent },
          { path: 'manageAccount', component: ManageAccountComponent },
          { path: 'manageBlockAccount', component: ManageBlockAccountComponent },
          { path: 'manageOrder', component: ManageOrderComponent },
          { path: 'manageOrderDetail/:orderId', component: ManageOrderDetailComponent },
          { path: 'manageRejectOrder', component: ManageRejectoderComponent },
          { path: 'manageApproveOrder', component: ManageApproveoderComponent },
          // { path: 'forgotPassword', component: ForgotPasswordComponent },
          //  { path: 'updatePassword', component: NewPasswordComponent },

     ]
},
{
     path: '',
     redirectTo: 'home',
     pathMatch: 'full'
},
{
     path: 'home',
     component: HomeComponent,

}
     ,
{
     path: 'dashboard',
     component: ProductComponent, canActivate: [authGuard],

},
{
     path: 'userinfor',
     component: UserInforComponent
},
{
     path: 'historyOrder',
     component: OrderComponent
},

{ path: 'changePassword', component: ChangePasswordComponent },

{ path: 'cart', component: CartComponent },
{ path: 'product/:id', component: ProductDetailComponent },



{ path: 'category/:id', component: ProductByCategoryComponent }


];
