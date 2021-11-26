import { useState, useEffect } from 'react';

import { Layout, AddEdit } from 'components/gameservers';
import { Spinner } from 'components';
import { gameServerService, alertService } from 'services';

export default Edit;

function Edit({ id }) {
    const [gameServer, setGameServer] = useState(null);

    useEffect(() => {
        // fetch gameServer and set default form values if in edit mode
        gameServerService.getById(id)
            .then(x => setGameServer(x))
            .catch(alertService.error)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <h1>Edit Game Server</h1>
            {gameServer ? <AddEdit gameServer={gameServer} /> : <Spinner /> }
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}
