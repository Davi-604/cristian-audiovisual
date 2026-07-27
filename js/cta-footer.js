/**
 * cta-footer.js
 * Lógica do Footer Animado com ASCII estático centralizado e Efeito Parallax
 */

const HIGHLIGHT_LIFETIME = 300; 
const CLUSTER_SIZE = 10;
const PARALLAX_EASE = 0.05;

// A câmera ASCII enviada
const CAMERA_ASCII = `                                                                                                    
                                                                                                    
                                                                                                    
                                                   #**********#                                     
                                                 ################                                   
                                                ##################                                  
                                   #%#******* #%###+=++*=-==#:####%#                                
                           %  %*# %%%%#%%##%@%%####################% %##%@@%%#%%                    
                 ###%%#**####*%***#%%%#+%##%@%@@@@@@@@@@@@@@@@@@@@@%@%%@%%%%%%%#%                   
              ++#+%%%###%%###%%#*#%%@%%%%%%%%%@@@@@@@%%%%%%%@@@@@@@@#%%%%##%%%%%%%#                 
               =#%%%%%####%%%***%%@@@%%#%%-=%%@@@%@##+--==-=#%%@@@@@%%%%%%%%%%%%%%%=-+              
               %%###%@%%#*#%%@@@@@@@@%%%%%%%%%%%*-:--=====++****#%%%%%%%%-#-%%%%%%%+*               
               %%%#%%%%%%%%%%@%@@@@@@%%%%%%%%%=:.::=@@%%%%%%@@##-*#%%%%%%%%%%%%%%%#                 
              %%%%%@@@@@@@@@@@@@@@@@@%%%%%%%*.:+:-%@@@%%%%%%%@@%%*+#%%%%%%%*%%%%%%#                 
              #%%%%%@@@@@@@@@@@@@@@@@%%%%%%*...=@@%%%%%%%%%%%%%%@%%##%@%%%%%%%%%%%#                 
              %%%%%%%%%%%%%%%@@@@@@%%%%%%%#-::+@@@@@%%%%%%%%%%%%%@%%##%@%%%%%%%%%%#                 
              %%%#%%%%####%#%%@@@@@%%%#*%%+==+@@%%%%%%%%%%%%%%%%%%@%###@%%%%%%%%%%#                 
              %%%%#%%#######%%@@@@@%%%@@@%*++#@@%%%%%%%%%%%%%%%%%%@%%##%@%%%%%%%%%#                 
              %%%%%%%###*###%@@@@@@%%%%%%%*+*%@@%%%%%############%@%#++%@%%%%%%%%%#                 
              %%#%%%###%####%@@@@@%%%%%%%@###%%%%#################@%*++%@%%%%%%%%%#                 
              %%%##%%%##%#%%%@@@@@@%%%%%%@%##%%%##################%#--=%%%%%%%%%%%#                 
              %%%##%%%%%#%%%@@@@@@%%%%%%%%@%##%%#######********####:::#@%%%%%%%%%%#                 
              %%%##%%%%%#%%%@@@@@@%%%%%%%%%@%###%%%*%%%%%%%%%%%%=:..:*@%%%%%%%%%%%#                 
              %%%##%%%%%%%%%@@@@@@%%%%%%%@%%@@#+###%%%#%##%%%*:::++-#@%%%%%%%%%%%%#                 
              #%%##%%%%%%%%%@@@@@@%%%%%%%@@%%@@@###***=::::===--:=*@@%%%%%%%%%%%%%#                 
              %%%%#%%%%%%%%%@@@@@@@%%%%%%%%%%%@@@@%#***++++===+#@@@%%%%%%%%%%%%%%%%                 
              %%%%%%%%%%%%%@@@@@@@%%%%%%%%%%%%%%%@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%%%                 
              %%%%#%%%%%%%@@@@@@@@%%%%%%%%%%%%%%%%%%%%@@@@@@%%%%%%%%%%%%%%%%%%%%%%#                 
               %%##%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%                  
                #%%@@%%@@@%%%%%%##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%##**                     
                                                                                                    
                                                                                                    
                                                                                                    `;

// Configurações
const config = {
  cellWidth: 8,
  cellHeight: 14,
  fontSize: 12,
  parallaxStrength: 20,
  hoverRadius: 8,
  charColor: "#7C98B3", // brand-muted from tailwind
  hoverColor: "#CEE5F2", // brand-ice
  hoverCharColor: "#0A1128" // brand-deep
};

function buildAsciiCells(asciiString) {
  const lines = asciiString.split('\n');
  const rows = lines.length;
  let columns = 0;
  for (let line of lines) {
    if (line.length > columns) columns = line.length;
  }
  
  const cells = new Map();
  for (let row = 0; row < rows; row++) {
    const line = lines[row];
    for (let col = 0; col < line.length; col++) {
      const char = line[col];
      // Ignora espaços vazios para não desenhar e não capturar hover nelas
      if (char !== ' ' && char !== '\r' && char !== undefined) {
        cells.set(`${col},${row}`, {
          col,
          row,
          char: char,
          highlightEndTime: 0,
        });
      }
    }
  }

  return { rows, columns, cells };
}

function highlightCluster(cells, startCell) {
  const now = Date.now();
  startCell.highlightEndTime = now + HIGHLIGHT_LIFETIME;

  const steps = Math.floor(Math.random() * CLUSTER_SIZE) + 1;
  const litCells = [startCell];
  let current = startCell;

  for (let step = 0; step < steps; step++) {
    const neighbours = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const neighbour = cells.get(`${current.col + dx},${current.row + dy}`);
        if (neighbour && !litCells.includes(neighbour)) neighbours.push(neighbour);
      }
    }
    if (neighbours.length === 0) break;

    const next = neighbours[Math.floor(Math.random() * neighbours.length)];
    next.highlightEndTime = now + HIGHLIGHT_LIFETIME + step * 10;
    litCells.push(next);
    current = next;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("cta-footer");
  const canvas = document.getElementById("canvas-center");
  const wrap = document.getElementById("af-canvas-center");
  const orb = document.getElementById("cta-orb");
  if (!section || !canvas || !wrap) return;

  const hands = []; // Mantendo a estrutura original que aceitava múltiplos

  const setupAscii = (asciiStr, targetCanvas) => {
    const { rows, columns, cells } = buildAsciiCells(asciiStr);
    if (cells.size === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    targetCanvas.width = columns * config.cellWidth * dpr;
    targetCanvas.height = rows * config.cellHeight * dpr;

    const ctx = targetCanvas.getContext("2d");
    if (!ctx) return;
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${config.fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    const metrics = ctx.measureText("X");
    const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const baselineOffset = config.cellHeight / 2 + glyphHeight / 2 - metrics.actualBoundingBoxDescent;

    hands.push({
      canvas: targetCanvas,
      ctx,
      cells,
      cellList: Array.from(cells.values()),
      rows,
      columns,
      cellWidth: config.cellWidth,
      cellHeight: config.cellHeight,
      baselineOffset,
    });
  };

  setupAscii(CAMERA_ASCII, canvas);

  const renderAscii = (hand, now) => {
    const { ctx, cellList, cellWidth, cellHeight, baselineOffset, columns: cols, rows } = hand;
    ctx.clearRect(0, 0, cols * cellWidth, rows * cellHeight);

    for (const cell of cellList) {
      const x = cell.col * cellWidth;
      const y = cell.row * cellHeight;
      const isHighlighted = cell.highlightEndTime > now;

      if (isHighlighted) {
        ctx.fillStyle = config.hoverColor;
        ctx.fillRect(x, y, cellWidth, cellHeight);
      }
      ctx.fillStyle = isHighlighted ? config.hoverCharColor : config.charColor;
      ctx.fillText(cell.char, x + cellWidth / 2, y + baselineOffset);
    }
  };

  // Render inicial para garantir que a câmera já esteja visível antes do scroll chegar nela
  for (const hand of hands) {
    renderAscii(hand, Date.now());
  }

  // Pointer & Drift for Parallax
  const pointer = { x: 0, y: 0 };
  const drift = { x: 0, y: 0 };
  let isRevealed = false;

  const hoverAscii = (hand, clientX, clientY) => {
    const rect = hand.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    
    const mouseCol = ((clientX - rect.left) / rect.width) * hand.columns;
    const mouseRow = ((clientY - rect.top) / rect.height) * hand.rows;

    let closest = null;
    let closestDist = Infinity;
    
    for (const cell of hand.cellList) {
      const dx = mouseCol - cell.col;
      const dy = mouseRow - cell.row;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < closestDist) {
        closestDist = dist;
        closest = cell;
      }
    }
    
    if (closest && closestDist <= config.hoverRadius) {
      highlightCluster(hand.cells, closest);
    }
  };

  const onMouseMove = (event) => {
    const rect = section.getBoundingClientRect();
    const w = rect.width || 1;
    const h = rect.height || 1;
    pointer.x = ((event.clientX - rect.left) / w - 0.5) * config.parallaxStrength * 2;
    pointer.y = ((event.clientY - rect.top) / h - 0.5) * config.parallaxStrength * 2;
    
    for (const hand of hands) {
      hoverAscii(hand, event.clientX, event.clientY);
    }
  };

  window.addEventListener("mousemove", onMouseMove);

  // Orb State
  let orbX = 0;
  let orbY = 0;

  // Animation Loop
  let rafId = 0;
  let isAnimating = false;
  const frame = () => {
    if (!isRevealed) {
      isAnimating = false;
      return;
    }

    const now = Date.now();
    for (const hand of hands) renderAscii(hand, now);

    // Orb Animation (Lissajous curve for organic, random-feeling motion)
    const time = now * 0.00015; // speed multiplier reduzido para um movimento mais lento e imersivo
    const sectionRect = section.getBoundingClientRect();
    const w = sectionRect.width;
    const h = sectionRect.height;
    
    // Calcula posição fluida baseada no tamanho da tela
    orbX = (w / 2) + Math.sin(time * 0.8) * (w * 0.3) + Math.cos(time * 1.3) * (w * 0.15);
    orbY = (h / 2) + Math.cos(time * 0.9) * (h * 0.25) + Math.sin(time * 1.5) * (h * 0.1);

    if (orb) {
      orb.style.transform = `translate(calc(-50% + ${orbX}px), calc(-50% + ${orbY}px))`;
    }

    // Aplica o hover do orbe na arte ASCII
    // Passamos as coordenadas relativas ao viewport (clientX/clientY)
    if (window.innerWidth < 768) {
      for (const hand of hands) {
        hoverAscii(hand, sectionRect.left + orbX, sectionRect.top + orbY);
      }
    }

    drift.x += (pointer.x - drift.x) * PARALLAX_EASE;
    drift.y += (pointer.y - drift.y) * PARALLAX_EASE;
    
    const x = drift.x || 0;
    const y = -drift.y || 0;
    
    wrap.style.transform = `translate(${x}px, ${y}px)`;

    rafId = requestAnimationFrame(frame);
  };

  // Scroll Reveal Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isRevealed = true;
        section.classList.add('is-revealed');
        if (!isAnimating) {
          isAnimating = true;
          rafId = requestAnimationFrame(frame);
        }
      } else {
        isRevealed = false;
        section.classList.remove('is-revealed');
      }
    });
  }, { threshold: 0 });

  observer.observe(section);
});
