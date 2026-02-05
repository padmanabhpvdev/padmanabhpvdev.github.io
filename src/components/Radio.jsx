import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Sample.css';
import './Audio.css';
import Hls from 'hls.js';

function Radios() {
  const [allStations, setAllStations] = useState([]);
  const [displayStations, setDisplayStations] = useState([]);
  const [currentStation, setCurrentStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadedCount, setLoadedCount] = useState(0);
  const [fetchingAll, setFetchingAll] = useState(true);
  const [progress, setProgress] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [playbackError, setPlaybackError] = useState(null);
  const [isHlsSupported, setIsHlsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hlsLoading, setHlsLoading] = useState(false);
  
  const audioRef = useRef(null);
  const hlsRef = useRef(null);
  const displayInterval = useRef(null);

  useEffect(()=>{
    document.title="Radios ● Padmanabh's Blog";
  },[]);

  useEffect(() => {
    const supported = Hls.isSupported();
    setIsHlsSupported(supported);
    console.log('HLS supported:', supported);
    
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (displayInterval.current) {
        clearInterval(displayInterval.current);
      }
    };
  }, []);
  const isHlsFormat = (url) => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes('.m3u8');
  };

  const getAudioType = (url) => {
    if (!url) return 'audio/mpeg';
    
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('.mp3')) return 'audio/mpeg';
    if (lowerUrl.includes('.aac')) return 'audio/aac';
    if (lowerUrl.includes('.ogg')) return 'audio/ogg';
    if (lowerUrl.includes('.wav')) return 'audio/wav';
    if (lowerUrl.includes('.flac')) return 'audio/flac';
    if (lowerUrl.includes('.m3u8')) return 'application/vnd.apple.mpegurl';
    if (lowerUrl.includes('.pls')) return 'audio/x-scpls';
    if (lowerUrl.includes('.asx')) return 'video/x-ms-asf';
    return 'audio/mpeg';
  };

  const processStations = (stations) => {
    return stations.map(station => ({
      ...station,
      isHls: isHlsFormat(station.url),
      audioType: getAudioType(station.url),
      lastCheckOk: station.lastCheckOk || false
    }));
  };
  const initializeHlsPlayer = (url) => {
    setHlsLoading(true);
    setPlaybackError(null);
    
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    if (!audioRef.current) {
      console.error("Audio element not found");
      setHlsLoading(false);
      return false;
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 90,
      maxBufferLength: 30,
      maxMaxBufferLength: 600,
      maxBufferSize: 60 * 1000 * 1000,
      maxBufferHole: 0.5,
      maxSeekHole: 2,
      maxFragLookUpTolerance: 0.25,
      liveSyncDurationCount: 3,
      liveMaxLatencyDurationCount: 10,
      abrEwmaFastLive: 3,
      abrEwmaSlowLive: 9,
      abrEwmaFastVoD: 3,
      abrEwmaSlowVoD: 9,
      fragLoadingTimeOut: 20000,
      manifestLoadingTimeOut: 10000,
      levelLoadingTimeOut: 10000,
    });

    hlsRef.current = hls;

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      console.log('HLS: Media attached');
      hls.loadSource(url);
    });

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log('HLS: Manifest parsed');
      setHlsLoading(false);
      audioRef.current.play().catch(error => {
        console.error("HLS playback failed:", error);
        setPlaybackError("Failed to play HLS stream. The station might be offline.");
      });
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error('HLS Error:', data);
      setHlsLoading(false);
      
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.error('HLS Network Error');
            setPlaybackError("Network error. Trying to reconnect...");
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.error('HLS Media Error');
            setPlaybackError("Media error. Attempting recovery...");
            hls.recoverMediaError();
            break;
          default:
            console.error('HLS Fatal Error');
            setPlaybackError("HLS stream error. Trying fallback methods...");
            tryNativePlayback(url);
            break;
        }
      }
    });

    try {
      hls.attachMedia(audioRef.current);
      return true;
    } catch (error) {
      console.error('Failed to attach HLS:', error);
      setHlsLoading(false);
      return false;
    }
  };

  const tryNativePlayback = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Native HLS playback started");
        }).catch(error => {
          console.error("Native HLS playback failed:", error);
          setPlaybackError("Cannot play HLS stream in this browser. Try Safari or install HLS extension.");
        });
      }
    }
  };
  const playStation = async (station) => {
    setPlaybackError(null);
    setCurrentStation(station);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    setTimeout(() => {
      if (station.isHls) {
        console.log('Playing HLS station:', station.name);
        
        if (Hls.isSupported()) {
          console.log('Using hls.js for playback');
          const success = initializeHlsPlayer(station.url);
          if (!success) {
            setPlaybackError("Failed to initialize HLS player. Trying native playback...");
            tryNativePlayback(station.url);
          }
        } else if (audioRef.current && audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          console.log('Using native HLS playback (Safari/iOS)');
          tryNativePlayback(station.url);
        } else {
          setPlaybackError(
            "HLS streaming not supported in this browser. " +
            "Try using Safari, Chrome with HLS extension, or use the m3u8 link directly in VLC."
          );
        }
      } else {
        console.log('Playing regular stream:', station.name);
        if (audioRef.current) {
          audioRef.current.src = station.url;
          audioRef.current.load();
          
          audioRef.current.play().catch(error => {
            console.error("Playback failed:", error);
            setPlaybackError("Unable to play this station. It might be offline or blocked.");
          });
        }
      }
    }, 100);
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
    }
    
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    
    setCurrentStation(null);
    setPlaybackError(null);
    setIsPlaying(false);
    setHlsLoading(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    const handlePlay = () => {
      setIsPlaying(true);
      setPlaybackError(null);
    };
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e) => {
      console.error('Audio error:', e);
      if (currentStation && !currentStation.isHls) {
        setPlaybackError("Unable to play this station. It might be offline or blocked.");
      }
    };
    
    if (audio) {
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentStation]);

  const fetchAllIndianStations = useCallback(async () => {
    try {
      setLoading(true);
      setFetchingAll(true);
      setError(null);
      setProgress(0);
      
      let allStationsData = [];
      let offset = 0;
      const limit = 100;
      let fetchAttempts = 0;
      const maxAttempts = 10;
      
      while (fetchAttempts < maxAttempts) {
        try {
          const response = await fetch(
            `https://de1.api.radio-browser.info/json/stations/search?countrycode=IN&hidebroken=true&offset=${offset}&limit=${limit}`
          );
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.length === 0) {
            break;
          }
          
          const processedBatch = data
            .filter(station => station.url && station.url.trim() !== '')
            .map((station, index) => ({
              id: station.stationuuid || `station-${offset + index}`,
              name: station.name,
              url: station.url_resolved || station.url,
              favicon: station.favicon || 'https://clipart-library.com/newhp/275-2754727_old-radio-comments-clipart.png',
              tags: station.tags,
              country: station.country,
              votes: station.votes || 0,
              language: station.language,
              state: station.state || 'India',
              codec: station.codec || 'MP3',
              bitrate: station.bitrate || 128,
              lastCheckOk: station.lastcheckok || false
            }));
          
          allStationsData = [...allStationsData, ...processedBatch];
          offset += data.length;
          fetchAttempts++;
          
          const progressPercent = Math.min((fetchAttempts / maxAttempts) * 100, 100);
          setProgress(progressPercent);
          
        } catch (batchError) {
          offset += limit;
          fetchAttempts++;
        }
      }
      
      const uniqueStations = Array.from(new Map(allStationsData.map(station => [station.id, station])).values());
      
      uniqueStations.sort((a, b) => (b.votes || 0) - (a.votes || 0));
      
      const processedStations = processStations(uniqueStations);
      
      setAllStations(processedStations);
      setFetchingAll(false);
      setLoading(false);
      
      startIncrementalDisplay(processedStations);
      
    } catch (error) {
      setError(`Failed to load radio stations: ${error.message}`);
      setLoading(false);
      setFetchingAll(false);
    }
  }, []);

  const startIncrementalDisplay = useCallback((stations) => {
    if (displayInterval.current) {
      clearInterval(displayInterval.current);
    }
    
    setDisplayStations([]);
    setLoadedCount(0);
    
    const initialBatch = stations.slice(0, 10);
    setDisplayStations(initialBatch);
    setLoadedCount(initialBatch.length);
    
    let currentIndex = 10;
    const totalStations = stations.length;
    
    displayInterval.current = setInterval(() => {
      if (currentIndex >= totalStations) {
        clearInterval(displayInterval.current);
        return;
      }
      
      const nextBatchSize = Math.min(5, totalStations - currentIndex);
      const nextBatch = stations.slice(currentIndex, currentIndex + nextBatchSize);
      
      setDisplayStations(prev => [...prev, ...nextBatch]);
      setLoadedCount(currentIndex + nextBatchSize);
      
      currentIndex += nextBatchSize;
      
      if (currentIndex >= totalStations) {
        clearInterval(displayInterval.current);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      if (allStations.length > 0 && !loading) {
        startIncrementalDisplay(allStations);
      }
      return;
    }
    
    setIsSearching(true);
    
    if (displayInterval.current) {
      clearInterval(displayInterval.current);
      displayInterval.current = null;
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    const filtered = allStations.filter(station =>
      station.name.toLowerCase().includes(searchLower) ||
      (station.tags && station.tags.toLowerCase().includes(searchLower)) ||
      (station.state && station.state.toLowerCase().includes(searchLower)) ||
      (station.language && station.language.toLowerCase().includes(searchLower))
    );
    
    setSearchResults(filtered);
    setDisplayStations(filtered);
    setLoadedCount(filtered.length);
    
  }, [searchTerm, allStations, loading, startIncrementalDisplay]);

  useEffect(() => {
    fetchAllIndianStations();
    
    return () => {
      if (displayInterval.current) {
        clearInterval(displayInterval.current);
      }
    };
  }, [fetchAllIndianStations]);

  const handleRetry = () => {
    fetchAllIndianStations();
  };

  const stationsToDisplay = isSearching ? displayStations : displayStations;

  return (
    <div className="container-fluid p-0">
      <div className="container mt-4">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
            ></button>
            <button 
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={handleRetry}
            >
              Retry
            </button>
          </div>
        )}
        
        <div className="row mb-4">
          <div className="col-12">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-lg shadow-none"
                placeholder={`Search available Indian radio stations by name, language, etc...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
              {searchTerm && (
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setSearchTerm('')}
                  disabled={loading}
                >
                  Clear
                </button>
              )}
            </div>
            {searchTerm && isSearching && (
              <div className="mt-2 text-muted small">
                <i className="fas fa-info-circle me-1"></i>
                Found {searchResults.length} stations matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">
              {fetchingAll ? 'Fetching ALL Indian radio stations...' : 'Loading stations...'}
            </p>
            {fetchingAll && (
              <div className="mt-4" style={{maxWidth: '500px', margin: '0 auto'}}>
                <div className="progress" style={{height: '10px'}}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated" 
                    style={{width: `${progress}%`}}
                  ></div>
                </div>
                <p className="mt-2 small text-muted">
                  Loading stations from API... {Math.round(progress)}% complete
                </p>
              </div>
            )}
            
            <div className="alert alert-info mt-4">
              <i className="fas fa-info-circle me-2"></i>
              Fetching <strong>ALL</strong> available Indian radio stations. This may take a moment...
            </div>
          </div>
        ) : (
          <>
            <div className="row mb-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>
                    <i className="fas fa-broadcast-tower me-2"></i>
                    Indian Radio Stations
                    <span className="badge bg-primary ms-2">{allStations.length}</span>
                  </h5>
                  <div className="text-muted">
                    {isSearching ? (
                      <>
                        Showing {searchResults.length} search results
                        <span className="ms-2 badge bg-info">
                          <i className="fas fa-search me-1"></i>
                          Search Mode
                        </span>
                      </>
                    ) : (
                      <>
                        Loaded {loadedCount} of {allStations.length} stations
                        {loadedCount < allStations.length && (
                          <span className="ms-2 badge bg-success">
                            <i className="fas fa-sync fa-spin me-1"></i>
                            Loading...
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                <div className="row mt-2">
                  <div className="col-12">
                    <div className="d-flex flex-wrap gap-3">
                      <span className="badge bg-secondary">
                        <i className="fas fa-globe-asia me-1"></i>
                        Powered by Radio-Browser API
                      </span>
                      {allStations.length > 0 && (
                        <>
                          <span className="badge bg-success">
                            <i className="fas fa-check-circle me-1"></i>
                            {allStations.filter(s => s.lastCheckOk).length} Active
                          </span>
                          <span className="badge bg-warning text-dark">
                            <i className="fas fa-star me-1"></i>
                            {allStations.filter(s => s.votes > 100).length} Popular
                          </span>
                          <span className="badge bg-info text-dark">
                            <i className="fas fa-stream me-1"></i>
                            {allStations.filter(s => s.isHls).length} HLS Streams
                          </span>
                          <span className="badge bg-dark">
                            <i className="fas fa-plug me-1"></i>
                            {isHlsSupported ? 'HLS.js Ready' : 'Native HLS'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4 mb-4">
              {stationsToDisplay.length > 0 ? (
                <>
                  {stationsToDisplay.map((station, index) => (
                    <div 
                      key={`${station.id}-${index}`} 
                      className="col"
                      style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <div 
                        className={`card shadow outline-0 h-100 ${currentStation?.id === station.id ? 'border-primary shadow playing' : 'border-0'}`}
                        onClick={() => playStation(station)}
                        style={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderWidth: currentStation?.id === station.id ? '3px' : station.isHls ? '2px' : '1px',
                          opacity: station.lastCheckOk ? 1 : 0.8,
                          position: 'relative'
                        }}
                        title={station.isHls ? "This station uses HLS streaming format" : ""}
                      >
                        {station.isHls && (
                          <div className="position-absolute top-0 end-0 m-2">
                            <span className="badge bg-info" style={{fontSize: '9px'}}>
                              <i className="fas fa-stream me-1"></i>
                              HLS
                            </span>
                          </div>
                        )}
                        
                        <div className="card-body">
                          <div className="d-flex align-items-start">
                            <div className="position-relative">
                              <img 
                                src={station.favicon} 
                                alt={station.name}
                                className="rounded me-3"
                                width="50"
                                height="50"
                                style={{ objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = 'https://clipart-library.com/newhp/275-2754727_old-radio-comments-clipart.png';
                                }}
                              />
                              {!station.lastCheckOk && (
                                <span className="position-absolute top-0 start-0 translate-middle badge bg-danger" 
                                      style={{fontSize: '8px', padding: '2px 4px'}}>
                                  !
                                </span>
                              )}
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="card-title mb-1 text-truncate">
                                <span className="d-inline-block" style={{maxWidth: '200px'}}>
                                  {station.name}
                                  {station.isHls && (
                                    <i className="fas fa-stream ms-2 text-info" style={{fontSize: '12px'}}></i>
                                  )}
                                </span>
                              </h6>
                              
                              {station.tags && (
                                <div className="mb-2">
                                  {station.tags.split(',').slice(0, 2).map((tag, idx) => (
                                    <span key={idx} className="badge bg-light text-dark me-1 mb-1">
                                      {tag.trim()}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              <div className="small text-muted">
                                <div className="d-flex flex-wrap gap-2">
                                  {station.language && (
                                    <span>
                                      <i className="fas fa-language me-1"></i>
                                      {station.language}
                                    </span>
                                  )}
                                  {station.state && station.state !== 'India' && (
                                    <span>
                                      <i className="fas fa-map-marker-alt me-1"></i>
                                      {station.state}
                                    </span>
                                  )}
                                  {station.bitrate && (
                                    <span>
                                      <i className="fas fa-tachometer-alt me-1"></i>
                                      {station.bitrate}kbps
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="card-footer bg-transparent py-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              <i className="fas fa-thumbs-up me-1"></i>
                              {station.votes} votes
                            </small>
                            <div>
                              {station.codec && (
                                <small className="badge bg-dark me-1">
                                  {station.codec}
                                </small>
                              )}
                              {station.isHls && (
                                <small className="badge bg-info">
                                  <i className="fas fa-stream me-1"></i>
                                  HLS
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {!isSearching && loadedCount < allStations.length && (
                    <div className="col-12">
                      <div className="text-center py-4">
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="text-muted">
                          Loading more stations automatically... {loadedCount} of {allStations.length}
                        </span>
                        <div className="progress mt-2" style={{height: '4px', maxWidth: '300px', margin: '0 auto'}}>
                          <div 
                            className="progress-bar progress-bar-striped progress-bar-animated" 
                            style={{width: `${(loadedCount / allStations.length) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!isSearching && loadedCount >= allStations.length && allStations.length > 0 && (
                    <div className="col-12">
                      <div className="alert alert-success text-center">
                        <i className="fas fa-check-circle me-2"></i>
                        All {allStations.length} Indian radio stations loaded!
                        {allStations.filter(s => s.isHls).length > 0 && (
                          <span className="ms-2">
                            ({allStations.filter(s => s.isHls).length} stations use HLS streaming)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="col-12">
                  <div className="alert alert-warning text-center">
                    <i className="fas fa-search me-2"></i>
                    {isSearching ? (
                      <>
                        No stations found matching "{searchTerm}"
                        <button 
                          className="btn btn-sm btn-outline-warning ms-3"
                          onClick={() => setSearchTerm('')}
                        >
                          Show All Stations
                        </button>
                      </>
                    ) : (
                      "No stations available. Please try refreshing."
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {currentStation && (
        <div className="fixed-bottom bg-dark text-white shadow-lg">
          <div className="container py-3">
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <img 
                    src={currentStation.favicon} 
                    alt={currentStation.name}
                    className="rounded me-3"
                    width="50"
                    height="50"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://clipart-library.com/newhp/275-2754727_old-radio-comments-clipart.png';
                    }}
                  />
                  <div className="text-truncate">
                    <h6 className="mb-0">
                      {currentStation.name}
                      {currentStation.isHls && (
                        <i className="fas fa-stream ms-2 text-info" style={{fontSize: '14px'}}></i>
                      )}
                    </h6>
                    <small className=" text-white">
                      {currentStation.state && currentStation.state !== 'India' ? currentStation.state : 'India'}
                      {currentStation.language && ` • ${currentStation.language}`}
                    </small>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="w-100" style={{ maxWidth: '600px' }}>
                    <audio 
                      ref={audioRef} 
                      controls 
                      autoPlay
                      className="w-100"
                      crossOrigin="anonymous"
                      preload="auto"
                    >
                    </audio>
                    
                    {playbackError && (
                      <div className="alert alert-warning alert-dismissible fade show mt-2 p-2" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        <small>{playbackError}</small>
                        <button 
                          type="button" 
                          className="btn-close btn-close-white" 
                          onClick={() => setPlaybackError(null)}
                        ></button>
                        
                        {currentStation.isHls && (
                          <div className="mt-2">
                            <small>Try:</small>
                            <div className="d-flex flex-wrap gap-2 mt-1">
                              {isHlsSupported && (
                                <button 
                                  className="btn btn-sm btn-outline-light"
                                  onClick={() => playStation(currentStation)}
                                  disabled={hlsLoading}
                                >
                                  <i className="fas fa-redo me-1"></i>
                                  Retry
                                </button>
                              )}
                              <a 
                                href={currentStation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-light"
                              >
                                <i className="fas fa-external-link-alt me-1"></i>
                                Open in VLC
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 text-md-end">
                <div className="d-flex justify-content-end gap-2 align-items-center">
                  <div className="text-white small text-end">
                    <div>
                      <i className="fas fa-tachometer-alt me-1"></i>
                      {currentStation.bitrate}kbps
                    </div>
                    <div>
                      <i className="fas fa-thumbs-up me-1"></i>
                      {currentStation.votes} votes
                    </div>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-light"
                    onClick={stopPlayback}
                  >
                    <i className="fas fa-stop me-1"></i>
                    Stop
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-5 py-3 bg-light border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p className="mb-0 text-muted">
                <small>
                  <i className="fas fa-broadcast-tower me-1"></i>
                  <strong>Indian Radio Network</strong> • 
                  <i className="fas fa-music ms-2 me-1"></i>
                  {allStations.length} stations
                  {isHlsSupported ? (
                    <span className="ms-2 text-success">
                      <i className="fas fa-check-circle me-1"></i>
                      HLS.js Supported
                    </span>
                  ) : (
                    <span className="ms-2 text-info">
                      <i className="fas fa-info-circle me-1"></i>
                      Native HLS Only
                    </span>
                  )}
                </small>
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={fetchAllIndianStations}
                disabled={loading}
              >
                <i className="fas fa-redo me-1"></i>
                Refresh All
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Radios;