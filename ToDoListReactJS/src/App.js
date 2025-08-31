import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [gorevler, setGorevler] = useState([]);
  const [yeniBaslik, setYeniBaslik] = useState('');
  const [duzenlemeModu, setDuzenlemeModu] = useState(null);
  const [duzenlenenBaslik, setDuzenlenenBaslik] = useState('');

  useEffect(() => {
    axios.get('https://localhost:44317/api/gorev')
      .then(response => setGorevler(response.data))
      .catch(err => console.error(err));
  }, []);

  const gorevEkle = () => {
    if (!yeniBaslik.trim()) return;

    axios.post('https://localhost:44317/api/gorev', {
      Baslik: yeniBaslik,
      TamamlandiMi: false,
      OlusturmaTarihi: new Date()
    })
      .then(response => {
        setGorevler([response.data, ...gorevler]);
        setYeniBaslik('');
      })
      .catch(err => console.error(err));
  };

  const gorevSil = (id) => {
    axios.delete(`https://localhost:44317/api/gorev/${id}`)
      .then(() => {
        setGorevler(gorevler.filter(g => g.ID !== id));
      })
      .catch(err => console.error(err));
  };

  const gorevToggle = (gorev) => {
    axios.put(`https://localhost:44317/api/gorev/${gorev.ID}`, {
      ...gorev,
      TamamlandiMi: !gorev.TamamlandiMi
    })
      .then(response => {
        setGorevler(gorevler.map(g => g.ID === gorev.ID ? response.data : g));
      })
      .catch(err => console.error(err));
  };

  const gorevGuncelle = (id) => {
    const gorev = gorevler.find(g => g.ID === id);
    if (!duzenlenenBaslik.trim()) return;

    axios.put(`https://localhost:44317/api/gorev/${id}`, {
      ...gorev,
      Baslik: duzenlenenBaslik
    })
      .then(response => {
        setGorevler(gorevler.map(g => g.ID === id ? response.data : g));
        setDuzenlemeModu(null);
        setDuzenlenenBaslik('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div id="app-container">
      <div id="left-panel">
        <h2>Yeni Görev Ekle</h2>
        <input
          type="text"
          placeholder="Görev başlığı girin"
          value={yeniBaslik}
          onChange={e => setYeniBaslik(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && gorevEkle()}
        />
        <button onClick={gorevEkle}>Ekle</button>
      </div>

      <div id="right-panel">
        <h2>Görevler</h2>
        <ul>
          {gorevler.map(gorev => (
            <li key={gorev.ID}>
              <input
                type="checkbox"
                checked={gorev.TamamlandiMi}
                onChange={() => gorevToggle(gorev)}
              />

              {duzenlemeModu === gorev.ID ? (
                <>
                  <input
                    type="text"
                    value={duzenlenenBaslik}
                    onChange={e => setDuzenlenenBaslik(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && gorevGuncelle(gorev.ID)}
                    style={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}
                  />
                  <button
                    onClick={() => gorevGuncelle(gorev.ID)}
                    style={{ backgroundColor: '#28a745' }}
                  >
                    Kaydet
                  </button>
                  <button onClick={() => setDuzenlemeModu(null)}>İptal</button>
                </>
              ) : (
                <>
                  <span className={gorev.TamamlandiMi ? 'completed' : ''}>
                    {gorev.Baslik}
                  </span>
                  <button
                    onClick={() => {
                      setDuzenlemeModu(gorev.ID);
                      setDuzenlenenBaslik(gorev.Baslik);
                    }}
                    style={{ backgroundColor: '#ffc107' }}
                  >
                    Düzenle
                  </button>
                  <button onClick={() => gorevSil(gorev.ID)}>Sil</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;