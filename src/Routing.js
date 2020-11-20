import React from 'react';
import { Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Home from './Home'
export const HomeRoute = "/";
export const ProjectsRoute = "/projects/";
class Routing extends React.Component {
    render() {
        return (
            <Layout>
                <Route path={HomeRoute} exact component={Home} />
                <Route path={ProjectsRoute} component={Projects} />
            </Layout >
        );
    }
}
export default withRouter(Routing);