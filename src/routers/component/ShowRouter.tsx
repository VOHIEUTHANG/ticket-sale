import { CheckPermissionFunc } from 'src/shared/hoc/CheckPermission';
import React, { PropsWithChildren } from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@modules';
import { IRouter } from '@routers/interface';

interface IShowRouter {
  routers: IRouter[];
  MasterLayout?: React.FC<PropsWithChildren<any>>;
}

const renderRoute = (
  MasterLayout: React.FC<any> | undefined,
  hasMaster: boolean | undefined,
  component: any,
  path: string,
  exact: boolean,
) => {
  if (hasMaster === false) {
    return <Route key={path} path={path} exact={exact} component={component} />;
  }
  const DynamicComponent: React.FC<any> = component;
  if (MasterLayout) {
    return (
      <Route
        key={path}
        path={path}
        exact={exact}
        component={() => (
          <MasterLayout>
            <DynamicComponent />
          </MasterLayout>
        )}
      />
    );
  } else {
    return <Route key={path} path={path} exact={exact} component={DynamicComponent} />;
  }
};

const ShowRouter = ({ routers, MasterLayout }: IShowRouter) => {
  const listPermissionCode = useSelector((state: RootState) => state.profile.listPermissionCode);

  return React.useMemo(() => {
    return routers
      .filter(
        (it: IRouter) =>
          it.permissionCode === 'ALLOW' ||
          it.permissionCode == null ||
          CheckPermissionFunc(it.permissionCode, listPermissionCode),
      )
      .map((router: IRouter) => {
        return renderRoute(
          MasterLayout,
          router.masterLayout,
          router.component,
          router.path,
          router.exact || true,
        );
      });
  }, [routers, listPermissionCode, MasterLayout]);
};

export default ShowRouter;
