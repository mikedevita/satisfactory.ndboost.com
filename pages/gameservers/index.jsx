import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { Link, Spinner } from 'components';
import { Layout } from 'components/gameservers';
import { gameServerService } from 'services';

export default Index;

function Index() {
    const [gameServers, setGameServers] = useState(null);

    function checkStatus(id) {
        gameServerService.checkStatus(id)
        .then((gs) => {
            console.log(gs)
            setGameServers(gameServers.map(x => {
                if (x.id === gs.id) { x = gs }
                return x
            }))
        })
    }
    
    function toggleStatusCheck(id) {
        gameServerService.toggleStatusCheck(id)
        .then((gs) => setGameServers(gameServers.map(x => {
            if (x.id === gs.id) { x = gs }
            return x;
        })));
    }

    function deleteGameServer(id) {
        setGameServers(gameServers.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));

        gameServerService.delete(id).then(() => {
            setGameServers(gameServers => gameServers.filter(x => x.id !== id));
        });
    }

    useEffect(() => {
        gameServerService.getAll().then((x) =>setGameServers(x));
    }, []);

    return (
        <Layout>
            <h1>Game Servers</h1>
            <Link href="/gameservers/add" className="btn btn-sm btn-success mb-2">Add Game Server</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>name</th>
                        <th style={{ width: '30%' }}>ipAddress</th>
                        <th style={{ width: '30%' }}>queryPort</th>
                        <th style={{ width: '30%' }}>State</th>
                        <th style={{ width: '30%' }}>Version</th>
                        <th style={{ width: '30%' }}>Response Time</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {gameServers && gameServers.map(gameServer =>
                        <tr key={gameServer.id}>
                            <td>{gameServer.name}</td>
                            <td>{gameServer.ipAddress}</td>
                            <td>{gameServer.queryPort}</td>
                            <td>{gameServer.serverState}</td>
                            <td>{gameServer.serverVersion}</td>
                            <td>{gameServer.responseTimeInMsec}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/gameservers/edit/${gameServer.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => toggleStatusCheck(gameServer.id)} className={classNames('btn', 'btn-sm', 'mr-1', {'btn-success': (gameServer.enableStatusCheck), 'btn-primary': (gameServer.enableStatusCheck)})}>
                                    <FontAwesomeIcon icon={faSync} />
                                </button>
                                <button onClick={() => checkStatus(gameServer.id)} className={classNames('btn', 'btn-sm', 'mr-1', 'btn-primary')}>
                                    <FontAwesomeIcon icon={faSync} />
                                </button>
                                <button onClick={() => deleteGameServer(gameServer.id)} className="btn btn-sm btn-danger btn-delete-gameServer" disabled={gameServer.isDeleting}>
                                    {gameServer.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!gameServers &&
                        <tr>
                            <td colSpan="6">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {gameServers && !gameServers.length &&
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="p-2">No Game Servers To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
