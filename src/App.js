import {groupsData} from './group';
import {useState, useEffect} from 'react';

function App() {
  const [groups, setGroups] = useState(groupsData);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filter, setFilter] = useState({
    privacy: 'all',
    avatarColor: 'any',
    hasFriends: false
  });
  const [groupFriends, setGroupFriends] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setGroups(groupsData);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = groups.filter(group => {
      if (filter.privacy !== 'all' && group.closed !== (filter.privacy === 'closed')) {
        return false;
      }
      if (filter.avatarColor !== 'any' && group.avatar_color !== filter.avatarColor) {
        return false;
      }
      if (filter.hasFriends && (!group.friends || group.friends.length === 0)) {
        return false;
      }
      return true;
    });
    setFilteredGroups(filtered);
  }, [groups, filter]);

  const handleFilterChange = (key, value) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [key]: value
    }));
  };

  const toggleFriendsVisibility = (groupId) => {
    setGroupFriends(prevState => ({
      ...prevState,
      [groupId]: !prevState[groupId]
    }));
  };

  return (
    <div>
      <div>
        Filter by:
        <select value={filter.privacy} onChange={e => handleFilterChange('privacy', e.target.value)}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <select value={filter.avatarColor} onChange={e => handleFilterChange('avatarColor', e.target.value)}>
          <option value="any">Any</option>
        </select>
        <label>
          Has Friends:
          <input type="checkbox" checked={filter.hasFriends} onChange={e => handleFilterChange('hasFriends', e.target.checked)} />
        </label>
      </div>
      <div style={{ display: 'flex', flexВirection: 'column'}}>
        {filteredGroups.map(group => (
          <div key={group.id} style={{ border: '1px solid gray', padding: '5px', display: 'flex', flexDirection:' row',  alignItems: 'center',
           columnGap: '20px' }}>
            <div>
              <p>{group.name}</p>
              {group.avatar_color && <div style={{ width: '100px', height: '100px', backgroundColor: group.avatar_color, borderRadius: '50%' }}></div>}
              <p>{group.closed ? 'Closed' : 'Open'}</p>
              <p>Members: {group.members_count}</p>

              {group.friends && group.friends.length > 0 && (
                <button onClick={() => toggleFriendsVisibility(group.id)}>
                  View Friends
                </button>
              )}
            </div>
            <div>
              {groupFriends[group.id] && group.friends && group.friends.length > 0 && (
                <>
                  {group.friends.map(friend => (
                    <p key={friend.id}>{`${friend.first_name} ${friend.last_name}`}</p>
                  ))}
                </>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}


export default App;
