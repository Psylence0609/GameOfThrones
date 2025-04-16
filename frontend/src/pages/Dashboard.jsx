import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { runSimulationStep, fetchSimulationState, fetchPosts } from '../api';
import CitizenCard from '../components/CitizenCard';
import PoliticianCard from '../components/PoliticianCard';
import SocialMediaFeed from '../components/SocialMediaFeed';
import AddCitizenForm from '../components/AddCitizenForm';
import AddPoliticianForm from '../components/AddPoliticianForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ActionNotification from '../components/ActionNotification';
import Header from '../components/Header';
import TargaryenSpinner from '../components/TargaryenSpinner';

const socket = io('http://localhost:5001', {
  reconnectionAttempts: 3,
  timeout: 2000,
});

const Dashboard = () => {
  const [simulationState, setSimulationState] = useState({ citizens: [], politicians: [], vote_counts: {} });
  const [posts, setPosts] = useState([]);
  const [iterations, setIterations] = useState(1);
  const [actionQueue, setActionQueue] = useState([]);
  const [selectedPolitician, setSelectedPolitician] = useState('all');
  const [simulationCount, setSimulationCount] = useState(0);
  const [showAddCitizen, setShowAddCitizen] = useState(false);
  const [showAddPolitician, setShowAddPolitician] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const loadData = async () => {
    try {
      const state = await fetchSimulationState();
      setSimulationState(state);

      const postsData = await fetchPosts();
      setPosts(postsData);
    } catch (error) {
      console.error("Error loading data from backend:", error);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('agent_action', (action) => {
      setActionQueue((prevQueue) => [...prevQueue, action]);
    });

    return () => {
      socket.off('connect');
      socket.off('agent_action');
      socket.disconnect();
    };
  }, []);

  const handleRunStep = async () => {
    setIsSimulating(true);
    try {
      await runSimulationStep(iterations);
      await loadData();
      setSimulationCount(prev => prev + iterations);
    } catch (error) {
      console.error("Error running simulation step:", error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />

      <div className="container mx-auto px-4 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="card-medieval p-4 mb-4 md:mb-0 w-full md:w-auto">
            <h3 className="text-xl font-cinzel text-got-gold mb-2">Current Power Standings</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(simulationState.vote_counts).map(([house, count]) => (
                <div key={house} className="text-center">
                  <div className="text-xl font-cinzel text-got-gold">{count}</div>
                  <div className="text-sm text-got-ivory">{house}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-got-gold py-2.5 text-center">
              <label className="px-4 py-3 text-sm text-got-black font-cinzel mb-1">Iterations: </label>
              
              <input
                type="number"
                min="1"
                value={iterations}
                onChange={(e) => setIterations(Number(e.target.value))}
                className="bg-got-gold text-got-black border border-got-gold w-10 text-center"
              />
            </div>
            <div className="bg-got-gold p-2 text-center">
              <div className="px-6 py-1.5 font-cinzel text-sm text-got-black">
                Simulations Run: {simulationCount} 
              </div>
              {/* <div className="text-xl font-cinzel text-got-gold">{simulationCount}</div> */}
            </div>
            <div className="flex items-center">
              <button
                onClick={handleRunStep}
                className="px-6 py-3 bg-got-gold hover:bg-got-darkgold text-got-black font-cinzel transition-colors disabled:opacity-50"
                disabled={isSimulating}
              >
                Advance The Game
              </button>
              {isSimulating && <TargaryenSpinner />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-medieval p-6">
            <h2 className="text-2xl font-cinzel text-got-gold mb-6">Characters of the Realm</h2>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-cinzel text-got-gold">The Smallfolk</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-got-gold hover:bg-got-gold/20 rounded-full"
                onClick={() => setShowAddCitizen(true)}
                aria-label="Add Citizen"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {simulationState.citizens.map((citizen) => (
                <CitizenCard key={citizen.name} citizen={citizen} />
              ))}
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-cinzel text-got-gold">The Great Lords of Westeros</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-got-gold hover:bg-got-gold/20 rounded-full"
                onClick={() => setShowAddPolitician(true)}
                aria-label="Add Politician"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simulationState.politicians.map((politician) => (
                <PoliticianCard key={politician.name} politician={politician} />
              ))}
            </div>
          </div>

          <div className="card-medieval p-6">
            <h2 className="text-2xl font-cinzel text-got-gold mb-6">Ravens from the Realm</h2>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedPolitician('all')}
                  className={`px-3 py-1 text-sm font-medieval ${selectedPolitician === 'all'
                    ? 'bg-got-gold text-got-black'
                    : 'bg-got-darkgray text-got-ivory border border-got-gold'}`}
                >
                  All Houses
                </button>

                {simulationState.politicians.map(politician => (
                  <button
                    key={politician.name}
                    onClick={() => setSelectedPolitician(politician.name)}
                    className={`px-3 py-1 text-sm font-medieval ${selectedPolitician === politician.name
                      ? 'bg-got-gold text-got-black'
                      : 'bg-got-darkgray text-got-ivory border border-got-gold'}`}
                  >
                    Lord {politician.name}
                  </button>
                ))}
              </div>
            </div>

            <SocialMediaFeed
              posts={posts}
              selectedPolitician={selectedPolitician}
            />
          </div>
        </div>
      </div>

      <AddCitizenForm open={showAddCitizen} onOpenChange={setShowAddCitizen} />
      <AddPoliticianForm open={showAddPolitician} onOpenChange={setShowAddPolitician} />

      <ActionNotification actionQueue={actionQueue} setActionQueue={setActionQueue} />
    </div>
  );
};

export default Dashboard;
