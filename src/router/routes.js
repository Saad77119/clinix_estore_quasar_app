const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('pages/Index.vue'),
                name: 'Home'
            },
            {
                path: 'products',
                component: () =>
                    import ('pages/Products.vue'),
                name: 'products'
            },
            {
                path: 'product/details/:id',
                component: () =>
                    import ('pages/ProductDetail.vue'),
                name: 'product.detail'
            },
            {
                path: 'cart/list',
                component: () =>
                    import ('pages/CartList.vue'),
                name: 'cart.list'
            },
            {
                path: 'checkout/details',
                component: () =>
                    import ('pages/CheckoutDetails.vue'),
                name: 'checkout.details'
            },
            {
                path: 'cart/payment',
                component: () =>
                    import ('pages/CartPayment.vue'),
                name: 'cart.payment'
            },
            {
                path: 'user/profile',
                component: () =>
                    import ('pages/UserProfile.vue'),
                name: 'user.profile'
            },
            {
                path: 'addresses',
                component: () =>
                    import ('pages/Addresses.vue'),
                name: 'addresses'
            },
            {
                path: 'purchase/history',
                component: () =>
                    import ('pages/PurchaseHistory.vue'),
                name: 'purchase_history'
            },
            {
                path: 'order/detail/:id',
                component: () =>
                    import ('pages/OrderDetail.vue'),
                name: 'order_detail'
            },
            {
                path: 'add/prescription',
                component: () =>
                    import ('pages/AddPrescription.vue'),
                name: 'add_prescription'
            },
            {
                path: 'add/report',
                component: () =>
                    import ('pages/AddReport.vue'),
                name: 'add_report'
            },
            {
                path: '/userGuide',
                component: () =>
                    import ('pages/userGuide.vue'),
                name: 'userGuide'
            },
            {
                path: 'prescription/reports',
                component: () =>
                    import ('pages/Prescription&Reports.vue'),
                name: 'prescription_&_reports'
            },
            {
                path: 'prescription/detail/:id',
                component: () =>
                    import ('pages/PrescriptionDetail.vue'),
                name: 'prescription_detail'
            },
            {
                path: 'report/detail/:id',
                component: () =>
                    import ('pages/ReportDetail.vue'),
                name: 'report_detail'
            },
            {
                path: 'get/call/from/clinix',
                component: () =>
                    import ('pages/GetCallFromClinix.vue'),
                name: 'get_call_from_clinix'
            },
            {
                path: 'otp',
                component: () =>
                    import ('pages/otp.vue'),
                name: 'OTP'
            },

            {
                path: 'change_password',
                component: () =>
                    import ('pages/change_password.vue'),
                name: 'Change_password'
            },
            {
                path: 'sign_up',
                component: () =>
                    import ('pages/signup.vue'),
                name: 'Sign_Up'
            },
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/login',
        component: () =>
            import ('pages/Login.vue')
    },
    {
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes