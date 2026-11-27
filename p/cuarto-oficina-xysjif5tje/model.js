// Modelo unico del cuarto oficina - Concepto R7. Pulgadas.
// x: de la esquina de la pared D (0) a la pared de la ventana (137)
// y: de la pared de la cama (0) a la pared de la entrada (113). z: altura.
(function (root) {
  var W = 137, D = 113, H = 132, FD = 15.875, T = 0.75;
  var GRE = 0xd9d4ca, NOG = 0x9a6a3f, NEG = 0x22272b, BLA = 0xf3efe8, MAT = 0xf7f6f2, MET = 0x8d9296;
  var P = [];
  function box(id, name, grp, x0, x1, y0, y1, z0, z1, col, o) {
    var p = { id: id, name: name, grp: grp, c: [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2], h: [(x1 - x0) / 2, (y1 - y0) / 2, (z1 - z0) / 2], col: col, mv: null, ctl: null, solid: true };
    if (o) for (var k in o) p[k] = o[k];
    P.push(p); return p;
  }
  // puerta con bisagra vertical: eje en (hx,hy), sg = signo del giro al abrir
  function hinge(p, ctl, hx, hy, sg, max) { p.ctl = ctl; p.mv = { t: 'hinge', hx: hx, hy: hy, sg: sg, max: max || 90 }; return p; }
  var INT = 0xe9e4da, G = 0.0625;
  // casco hueco: fondo, costados, piso, techo y tablillas. dir = hacia donde abre
  function cab(id, name, grp, x0, x1, y0, y1, z0, z1, dir, shelves, extra) {
    var o = extra || {}, n = name;
    box(id + '_p', n + ' (piso)', grp, x0, x1, y0, y1, z0, z0 + T, GRE, o);
    box(id + '_t', n + ' (techo)', grp, x0, x1, y0, y1, z1 - T, z1, GRE, o);
    if (dir === 'y+' || dir === 'y-') {
      box(id + '_a', n + ' (costado)', grp, x0, x0 + T, y0, y1, z0 + T, z1 - T, GRE, o);
      box(id + '_b', n + ' (costado)', grp, x1 - T, x1, y0, y1, z0 + T, z1 - T, GRE, o);
      if (dir === 'y+') box(id + '_f', n + ' (fondo)', grp, x0 + T, x1 - T, y0, y0 + 0.25, z0 + T, z1 - T, INT, o);
      else box(id + '_f', n + ' (fondo)', grp, x0 + T, x1 - T, y1 - 0.25, y1, z0 + T, z1 - T, INT, o);
      (shelves || []).forEach(function (z, i) { box(id + '_s' + i, n + ' (tablilla)', grp, x0 + T, x1 - T, dir === 'y+' ? y0 + 0.25 : y0 + 1, dir === 'y+' ? y1 - 1 : y1 - 0.25, z, z + T, INT, o); });
    } else {
      box(id + '_a', n + ' (costado)', grp, x0, x1, y0, y0 + T, z0 + T, z1 - T, GRE, o);
      box(id + '_b', n + ' (costado)', grp, x0, x1, y1 - T, y1, z0 + T, z1 - T, GRE, o);
      if (dir === 'x-') box(id + '_f', n + ' (fondo)', grp, x1 - 0.25, x1, y0 + T, y1 - T, z0 + T, z1 - T, INT, o);
      else box(id + '_f', n + ' (fondo)', grp, x0, x0 + 0.25, y0 + T, y1 - T, z0 + T, z1 - T, INT, o);
      (shelves || []).forEach(function (z, i) { box(id + '_s' + i, n + ' (tablilla)', grp, dir === 'x-' ? x0 + 1 : x0 + 0.25, dir === 'x-' ? x1 - 0.25 : x1 - 1, y0 + T, y1 - T, z, z + T, INT, o); });
    }
  }
  function prop(id, name, grp, x0, x1, y0, y1, z0, z1, col) { return box(id, name, grp, x0, x1, y0, y1, z0, z1, col, { solid: false, amb: true }); } // media luz entre frentes (1/8 total)

  // ---------- PARED DE LA CAMA (C) ----------
  var yb = FD - T; // fondo de casco
  box('c_fill', 'Relleno 4" esquina D', 'paredC', 0, 4, 0, FD, 0, 108, GRE);
  cab('c_cl_top', 'Casco sobre closet', 'paredC', 4, 34, 0, yb, 84, 108, 'y+', []);
  box('c_cl_mid', 'Division sobre closet', 'paredC', 18.625, 19.375, 0.25, yb - 1, 84.75, 107.25, GRE);
  box('c_cl_jL', 'Jamba closet', 'paredC', 4, 4.75, 0, yb, 0, 84, GRE); box('c_cl_jR', 'Jamba closet', 'paredC', 33.25, 34, 0, yb, 0, 84, GRE);
  cab('c_b10a', 'Casco franja 10" bajo', 'paredC', 34, 44, 0, yb, 0, 84, 'y+', [16, 32, 48, 66]);
  cab('c_b10b', 'Casco franja 10" alto', 'paredC', 34, 44, 0, yb, 84, 108, 'y+', []);
  [0, 1, 2, 3].forEach(function (i) { var J0 = [44, 64.22, 84.44, 104.66, 124.875]; cab('c_bt' + i, 'Casco sobre la cama ' + (i + 1), 'paredC', J0[i], J0[i + 1], 0, yb, 62.4375, 84, 'y+', []); cab('c_bu' + i, 'Casco segundo cuerpo ' + (i + 1), 'paredC', J0[i], J0[i + 1], 0, yb, 84, 108, 'y+', []); });
  cab('c_cor0', 'Casco esquina bajo', 'paredC', 124.875, W, 0, yb, 0, 30, 'y+', []);
  cab('c_cor1', 'Casco esquina 30-62', 'paredC', 124.875, W, 0, yb, 30, 62, 'y+', [46]);
  cab('c_cor2', 'Casco esquina 62-84', 'paredC', 124.875, W, 0, yb, 62, 84, 'y+', []);
  cab('c_cor3', 'Casco esquina alto', 'paredC', 124.875, W, 0, yb, 84, 108, 'y+', []);
  box('c_cor_fix', 'Frente fijo nogal (tapado por credenza)', 'paredC', 124.875 + G, W, yb, FD, 0, 30 - G, NOG);
  // closet: dos hojas plegables de 15
  var l1 = box('cl1', 'Hoja plegable closet 1', 'paredC', 4 + G, 19 - G / 2, yb, FD, 0.25, 84 - G, GRE);
  l1.ctl = 'closet'; l1.mv = { t: 'fold1', hx: 4, hy: FD, max: 82 };
  var l2 = box('cl2', 'Hoja plegable closet 2', 'paredC', 19 + G / 2, 34 - G, yb, FD, 0.25, 84 - G, GRE);
  l2.ctl = 'closet'; l2.mv = { t: 'fold2', hx: 4, hy: FD, jx: 19, w: 15, max: 82 };
  hinge(box('d_b10', 'Puerta nogal franja 10"', 'paredC', 34 + G, 44 - G, yb, FD, 0.25, 84 - G, NOG), 'puertasC', 44, FD, -1);
  var J = [44, 64.22, 84.44, 104.66, 124.875], hs = [0, 1, 0, 1];
  for (var i = 0; i < 4; i++) hinge(box('d_sc' + i, 'Puerta sobre cama ' + (i + 1), 'paredC', J[i] + G, J[i + 1] - G, yb, FD, 62.4375 + G, 84 - G, GRE), 'puertasC', hs[i] ? J[i + 1] : J[i], FD, hs[i] ? -1 : 1);
  hinge(box('d_cor1', 'Puerta nogal esquina 30-62', 'paredC', 124.875 + G, W - G, yb, FD, 30 + G, 62 - G, NOG), 'puertasC', W, FD, -1);
  hinge(box('d_cor2', 'Puerta nogal esquina 62-84', 'paredC', 124.875 + G, W - G, yb, FD, 62 + G, 84 - G, NOG), 'puertasC', W, FD, -1);
  var J2 = [4, 19, 34, 44, 64.22, 84.44, 104.66, 124.875, 137], h2 = [0, 1, 1, 0, 1, 0, 1, 1];
  for (i = 0; i < 8; i++) hinge(box('d_up' + i, 'Puerta segundo cuerpo ' + (i + 1), 'paredC', J2[i] + G, J2[i + 1] - G, yb, FD, 84 + G, 108, GRE), 'altasC', h2[i] ? J2[i + 1] : J2[i], FD, h2[i] ? -1 : 1);

  // ---------- MUEBLE Y CAMA: las 33 piezas del trabajo de Mozaik "A4 Murphy Bed Full Horizontal" ----------
  // coordenadas del trabajo: x 0..80-7/8, y 0 = frente, z = altura. Mundo: x+44, y = FD - y
  var BEDP = [["G0", "G Costado mueble Izq", 0, [0.0, 0.75, 0.0, 15.875, -0.0, 60.4375], GRE], ["G1", "G Costado mueble Der", 0, [80.125, 80.875, 0, 15.875, -0.0, 60.4375], GRE], ["H2", "H Cabezal - tabla", 0, [0, 80.875, 0, 15.125, 60.4375, 61.1875], GRE], ["H3", "H Cabezal - riel frontal", 0, [0.75, 80.125, 0.0, 0.75, 58.4375, 60.4375], GRE], ["H4", "H Cabezal - soporte riel frontal 1 (madera solida)", 0, [0.75, 80.125, 0.75, 1.5, 58.9375, 60.4375], 0xd9c4a0], ["H5", "H Cabezal - soporte riel frontal 2 (madera solida)", 0, [0.75, 80.125, 1.5, 3.0, 59.6875, 60.4375], 0xd9c4a0], ["H6", "H Cabezal - riel trasero (madera solida)", 0, [0, 80.875, 15.125, 15.875, 60.4375, 62.4375], 0xd9c4a0], ["H7", "H Cabezal - liston de montaje Izq (madera solida)", 0, [0.75, 1.5, 3.0, 15.0, 59.4375, 60.4375], 0xd9c4a0], ["H8", "H Cabezal - liston de montaje Der (madera solida)", 0, [79.375, 80.125, 3.0, 15.0, 59.4375, 60.4375], 0xd9c4a0], ["F9", "F Cabecero", 0, [0.75, 80.125, 15.125, 15.875, 15.0, 30.875], GRE], ["E10", "E Frente de cama Izq", 1, [0.9375, 40.4375, -0.0, 0.75, 2.5, 58.25], GRE], ["E11", "E Frente de cama Der", 1, [40.4375, 79.9375, -0.0, 0.75, 2.5, 58.25], GRE], ["B12", "B Riel lateral Izq (PLYWOOD 3/4)", 1, [1.1875, 1.9375, 0.75, 6.625, 2.75, 58.25], 0xd9c4a0], ["B13", "B Riel lateral Der (PLYWOOD 3/4)", 1, [78.9375, 79.6875, 0.75, 6.625, 2.75, 58.25], 0xd9c4a0], ["D14", "D Riel de cabeza", 1, [1.9375, 78.9375, 0.75, 8.625, 2.75, 3.5], GRE], ["C15", "C Riel de pie (madera dura solida)", 1, [1.9375, 78.9375, 0.75, 3.75, 57.5, 58.25], 0xd9c4a0], ["A16", "A Marco - lado inferior (madera solida)", 1, [1.9375, 78.9375, 0.75, 2.25, 3.5, 4.25], 0xd9c4a0], ["A17", "A Marco - lado superior (madera solida)", 1, [1.9375, 78.9375, 0.75, 2.25, 56.75, 57.5], 0xd9c4a0], ["A18", "A Marco - travesano 1 plano (madera solida)", 1, [2.6875, 4.1875, 0.75, 1.5, 4.25, 56.75], 0xd9c4a0], ["A19", "A Marco - travesano 1 canto (madera solida)", 1, [1.9375, 2.6875, 0.75, 2.25, 4.25, 56.75], 0xd9c4a0], ["A20", "A Marco - travesano 2 plano (madera solida)", 1, [21.5625, 23.0625, 0.75, 1.5, 4.25, 56.75], 0xd9c4a0], ["A21", "A Marco - travesano 2 canto (madera solida)", 1, [20.8125, 21.5625, 0.75, 2.25, 4.25, 56.75], 0xd9c4a0], ["A22", "A Marco - travesano 3 plano (madera solida)", 1, [38.1875, 39.6875, 0.75, 1.5, 4.25, 56.75], 0xd9c4a0], ["A23", "A Marco - travesano 3 canto (madera solida)", 1, [39.6875, 40.4375, 0.75, 2.25, 4.25, 56.75], 0xd9c4a0], ["A24", "A Marco - travesano 4 plano (madera solida)", 1, [41.1875, 42.6875, 0.75, 1.5, 4.25, 56.75], 0xd9c4a0], ["A25", "A Marco - travesano 4 canto (madera solida)", 1, [40.4375, 41.1875, 0.75, 2.25, 4.25, 56.75], 0xd9c4a0], ["A26", "A Marco - travesano 5 plano (madera solida)", 1, [57.8125, 59.3125, 0.75, 1.5, 4.25, 56.75], 0xd9c4a0], ["A27", "A Marco - travesano 5 canto (madera solida)", 1, [59.3125, 60.0625, 0.75, 2.25, 4.25, 56.75], 0xd9c4a0], ["A28", "A Marco - travesano 6 plano (madera solida)", 1, [76.6875, 78.1875, 0.75, 1.5, 4.25, 56.75], 0xd9c4a0], ["A29", "A Marco - travesano 6 canto (madera solida)", 1, [78.1875, 78.9375, 0.75, 2.25, 4.25, 56.75], 0xd9c4a0], ["J30", "J Soporte de colchon inferior (PLYWOOD 1/4)", 1, [1.9375, 78.9375, 2.25, 2.565, 3.5, 30.5], 0xd9c4a0], ["J31", "J Soporte de colchon superior (PLYWOOD 1/4)", 1, [1.9375, 78.9375, 2.25, 2.565, 30.5, 57.5], 0xd9c4a0], ["I32", "I Riel de patas (madera solida 3/4 x 3/4)", 1, [2.8125, 78.0625, 3.75, 4.5, 54.75, 55.5], 0xd9c4a0]];
  var bed = { t: 'bed', py: FD - 4.75, pz: 11.75, max: 90 };
  BEDP.forEach(function (r) {
    var b = r[3], q = box('k_' + r[0], r[1], r[2] ? 'cama' : 'paredC', 44 + b[0], 44 + b[1], FD - b[3], FD - b[2], b[4], b[5], r[4]);
    if (r[2]) { q.ctl = 'cama'; q.mv = bed; }
    if (r[1].indexOf('Riel de patas') >= 0) q.solid = false;
  });
  var mt = box('bed_mat', 'Colchon 10" (54 x 75)', 'cama', 44 + 2.94, 44 + 77.94, FD - 12.56, FD - 2.56, 3.5, 57.5, MAT); mt.ctl = 'cama'; mt.mv = bed;
  // ropa de cama (solo con la cama abierta): cobija arena y dos almohadas hacia la ventana
  function bedx(id, name, x0, x1, d0, d1, z0, z1, col) { var q = box(id, name, 'cama', x0, x1, FD - d1, FD - d0, z0, z1, col, { solid: false, openOnly: true }); q.ctl = 'cama'; q.mv = bed; }
  bedx('bd_cob', 'Cobija', 46.6, 104, 2.4, 12.95, 3.15, 57.85, 0xd8ccb6);
  bedx('bd_al1', 'Almohada', 106, 120.5, 12.56, 16.2, 6, 28, 0xf4efe6);
  bedx('bd_al2', 'Almohada', 106, 120.5, 12.56, 16.2, 32, 54, 0xf4efe6);
  function bedh(id, x0, x1) { var q = box(id, 'Tirador cama', 'cama', x0, x1, FD, FD + 0.6, 50, 50.6, NOG); q.ctl = 'cama'; q.mv = bed; q.solid = false; }
  bedh('bed_h1', 60, 68); bedh('bed_h2', 101, 109);

  // ---------- CREDENZA (pared de la ventana) ----------
  // zona cabecero (15-7/8 a 62): dos puertas corredizas; zona libre (62 a 89): dos puertas de bisagra
  cab('cr_b1', 'Credenza casco zona cabecero', 'credenza', 125 + 2 * T, W, FD, 62, 0, 29, 'x-', [14]);
  box('cr_b1m', 'Credenza division', 'credenza', 125 + 2 * T, W - 0.25, 38.5, 39.25, 0.75, 28.25, GRE);
  cab('cr_b2', 'Credenza casco zona libre', 'credenza', 125 + T, W, 62, 89, 0, 29, 'x-', [14]);
  prop('gym1', 'Mat de ejercicio enrollado', 'credenza', 128, 134, 18, 36, 1, 7, 0x6f7d60); prop('gym2', 'Pesas', 'credenza', 128, 133, 42, 58, 15, 20, NEG);
  box('cr_top', 'Tope nogal credenza', 'credenza', 125, W, FD, 89, 29, 30, NOG);
  var s1 = box('cr_s1', 'Corrediza credenza 1 (zona cabecero)', 'credenza', 125, 125 + T, FD + G, 38.94, 0.5, 29 - G, GRE);
  s1.ctl = 'credenza'; s1.mv = { t: 'slide', v: [0, 23, 0] };
  var s2 = box('cr_s2', 'Corrediza credenza 2 (zona cabecero)', 'credenza', 125 + T, 125 + 2 * T, 38.94 - 1, 62 - G, 0.5, 29 - G, GRE);
  s2.ctl = 'credenzaB'; s2.mv = { t: 'slide', v: [0, -22, 0] };
  hinge(box('cr_d2', 'Puerta credenza 3 (zona libre)', 'credenza', 125, 125 + T, 62 + G, 82 - G, 0.5, 29 - G, GRE), 'credenzaL', 125, 62, 1);
  box('cr_fil', 'Relleno fijo de esquina 7"', 'credenza', 125, 125 + T, 82, 89, 0.5, 29 - G, GRE);

  // ---------- ESCRITORIO (pared de la entrada) ----------
  box('dk_top', 'Tope nogal escritorio', 'escritorio', 39, W, 89, D, 28.75, 30, NOG);
  cab('dk_pcL', 'Modulo PC (lado entrada)', 'escritorio', 39, 47, 89 + T, D, 0, 28.75, 'y-', []);
  prop('pc1', 'PC torre', 'escritorio', 40.2, 45.8, 93, 110, 1, 19, NEG);
  cab('dk_pcR', 'Modulo PC (junto a la credenza)', 'escritorio', 117, 125, 89 + T, D, 0, 28.75, 'y-', []);
  prop('pc2', 'PC torre', 'escritorio', 118.2, 123.8, 93, 110, 1, 19, NEG);
  box('dk_dead', 'Esquina cerrada (cables / UPS, registro por arriba)', 'escritorio', 125, W, 89, D, 0, 28.75, GRE);
  cab('dk_pr', 'Modulo impresora', 'escritorio', 78, 98, 89 + T, D, 0, 28.75, 'y-', []);
  hinge(box('dk_dL', 'Puerta modulo PC entrada', 'escritorio', 39 + G, 47 - G, 89, 89 + T, 0.5, 28.75 - G, GRE), 'escritorio', 39, 89, -1);
  hinge(box('dk_dR', 'Puerta modulo PC junto a credenza', 'escritorio', 117 + G, 125 - G, 89, 89 + T, 0.5, 28.75 - G, GRE), 'escritorio', 117, 89, -1);
  var tr = box('dk_tray', 'Bandeja extraible impresora', 'escritorio', 78 + 1, 98 - 1, 89, D - 2, 13, 14, GRE);
  var prn = box('dk_prn', 'Impresora', 'escritorio', 80.5, 95.5, 92, 107, 14, 21, 0x3a3f44, { solid: false }); prn.ctl = 'escritorio'; prn.mv = { t: 'slide', v: [0, -18, 0] };
  tr.ctl = 'escritorio'; tr.mv = { t: 'slide', v: [0, -18, 0] };
  [0, 1, 2, 3, 4].forEach(function (i) { var U = [39, 58.6, 78.2, 97.8, 117.4, 137]; cab('dk_up' + i, 'Gabinete alto escritorio ' + (i + 1), 'escritorio', U[i], U[i + 1], 100 + T, D, 64, 84, 'y-', []); });
  var ux = [39, 58.6, 78.2, 97.8, 117.4, 137];
  for (i = 0; i < 5; i++) hinge(box('dk_u' + i, 'Puerta alta escritorio ' + (i + 1), 'escritorio', ux[i] + G, ux[i + 1] - G, 100, 100 + T, 64, 84, GRE), 'escritorio', (i % 2) ? ux[i + 1] : ux[i], 100, (i % 2) ? 1 : -1);
  box('mon1', 'Monitor 1', 'escritorio', 55, 79, 106, 107, 34, 48, NEG, { solid: false });
  box('mon2', 'Monitor 2', 'escritorio', 100, 124, 106, 107, 34, 48, NEG, { solid: false });

  // ---------- CONSOLA HOME LAB + TV (pared D) ----------
  cab('co_b1', 'Consola bahia rack', 'consola', 0, 18 - T, 31, 55, 0, 25, 'x+', []);
  cab('co_b2', 'Consola bahia cerrada', 'consola', 0, 18 - T, 55, 79, 0, 25, 'x+', [12]);
  [3, 7, 11, 15].forEach(function (z, i) { prop('rk' + i, 'Equipo de rack', 'consola', 1, 15, 34, 52, z, z + 3, 0x30353a); });
  prop('ups', 'UPS', 'consola', 2, 14, 58, 66, 1, 9, NEG); prop('nas', 'NAS', 'consola', 3, 13, 68, 76, 13, 21, 0x30353a);
  box('co_top', 'Tope nogal consola', 'consola', 0, 18, 31, 79, 25, 26, NOG);
  hinge(box('co_d1', 'Puerta rack (metal perforado)', 'consola', 18 - T, 18, 31 + G, 55 - G, 0.5, 25 - G, NEG), 'consola', 18, 31, -1);
  hinge(box('co_d2', 'Puerta bahia cerrada', 'consola', 18 - T, 18, 55 + G, 79 - G, 0.5, 25 - G, GRE), 'consola', 18, 79, 1);
  box('tv', 'TV 55"', 'consola', 0.5, 3, 31, 79, 42, 69.5, NEG);

  // ---------- PUERTA DE ENTRADA ----------
  hinge(box('ent', 'Puerta de entrada', 'entrada', 5, 33.75, D - 1.5, D, 0, 80, BLA), 'entrada', 5, D, -1);

  // ---------- AMBIENTACION (se pone o se quita con un boton) ----------
  (function () {
    var C = [0x8d9aa5, 0xcfc7b8, 0x5f6b62, 0xb9a58c, 0x3f464c, 0xd9cdb8, 0x777d60], k = 0, n = 0;
    function p(g, x0, x1, y0, y1, z0, z1, c) { prop('am' + (n++), 'Ambientacion', g, x0, x1, y0, y1, z0, z1, c == null ? C[(k++) % C.length] : c); }
    function books(g, x, y0, z, cnt, h) { for (var i = 0; i < cnt; i++) p(g, x + i * 1.3, x + i * 1.3 + 1.1, y0, y0 + 7.5, z, z + h - (i % 3)); }
    function stack(g, x0, x1, y0, y1, z, cnt) { for (var i = 0; i < cnt; i++) p(g, x0 + i * 0.3, x1 - i * 0.3, y0, y1, z + i * 2.2, z + i * 2.2 + 2); }
    // franja de 10: libros y cajas
    books('paredC', 35.2, 4, 16.8, 5, 10); p('paredC', 35.3, 42.7, 3, 12, 32.8, 39, 0xcfc7b8); books('paredC', 35.2, 4, 48.8, 4, 11); p('paredC', 35.3, 42.7, 3, 12, 66.8, 72, 0xb9a58c); stack('paredC', 35.5, 42.5, 3, 12, 0.8, 4);
    // sobre la cama: almohadas, cobijas y cajas
    [44, 64.22, 84.44, 104.66].forEach(function (x, i) { if (i % 2 === 0) { p('paredC', x + 2, x + 18, 2, 13, 63.3, 69, 0xf4efe6); p('paredC', x + 3, x + 17, 2, 13, 69, 74, 0xf4efe6); } else stack('paredC', x + 2.5, x + 17.5, 2, 13, 63.3, 5); p('paredC', x + 2, x + 11, 2, 12, 84.8, 95, 0xcfc7b8); p('paredC', x + 12, x + 18.5, 2, 12, 84.8, 92, 0xb9a58c); });
    // esquina de la ventana
    books('paredC', 126.2, 4, 30.8, 6, 10); p('paredC', 126.5, 135.5, 3, 12, 46.8, 54, 0xcfc7b8); stack('paredC', 126.8, 135.2, 3, 12, 62.8, 4);
    // sobre el closet
    p('paredC', 5.5, 17.5, 2, 12, 84.8, 96, 0xcfc7b8); p('paredC', 20.5, 32.5, 2, 12, 84.8, 94, 0xb9a58c);
    // credenza zona libre y cabecero
    stack('credenza', 128, 135.5, 64, 80, 0.8, 4); p('credenza', 128, 135.5, 64, 74, 14.8, 21, 0xcfc7b8); p('credenza', 128, 135, 41, 58, 0.8, 9, 0x5f6b62);
    // gabinetes altos del escritorio
    [39, 58.6, 78.2, 97.8, 117.4].forEach(function (x, i) { if (i % 2) { p('escritorio', x + 2, x + 10, 103, 111, 64.8, 74, 0xcfc7b8); p('escritorio', x + 11, x + 17, 103, 111, 64.8, 71, 0xb9a58c); } else for (var j = 0; j < 9; j++) p('escritorio', x + 2 + j * 1.6, x + 3.4 + j * 1.6, 103.5, 111.5, 64.8, 76 - (j % 3)); });
    // sobre topes
    p('credenza', 128, 134, 30, 36, 30, 36.5, 0x777d60); p('credenza', 128.5, 136, 44, 53, 30, 31.2, 0xcfc7b8); p('credenza', 129, 135.5, 45, 52, 31.2, 32.2, 0xb9a58c);
    p('consola', 2, 9, 62, 72, 26, 27, 0xcfc7b8);
  })();

  // ---------- transformaciones ----------
  function rotZ(a) { var c = Math.cos(a), s = Math.sin(a); return [[c, -s, 0], [s, c, 0], [0, 0, 1]]; }
  function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return [[1, 0, 0], [0, c, -s], [0, s, c]]; }
  function mv(R, v) { return [R[0][0] * v[0] + R[0][1] * v[1] + R[0][2] * v[2], R[1][0] * v[0] + R[1][1] * v[1] + R[1][2] * v[2], R[2][0] * v[0] + R[2][1] * v[1] + R[2][2] * v[2]]; }
  function about(R, piv, c) { var d = mv(R, [c[0] - piv[0], c[1] - piv[1], c[2] - piv[2]]); return [piv[0] + d[0], piv[1] + d[1], piv[2] + d[2]]; }
  var I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  // pose(p,t): t de 0 (cerrado) a 1 (abierto). Devuelve centro c y matriz R
  function pose(p, t) {
    var m = p.mv; if (!m || !t) return { c: p.c.slice(), R: I, h: p.h };
    var a, R, c;
    if (m.t === 'hinge') { a = m.sg * m.max * t * Math.PI / 180; R = rotZ(a); return { c: about(R, [m.hx, m.hy, 0], p.c), R: R, h: p.h }; }
    if (m.t === 'bed') { a = -m.max * t * Math.PI / 180; R = rotX(a); return { c: about(R, [0, m.py, m.pz], p.c), R: R, h: p.h }; }
    if (m.t === 'slide') return { c: [p.c[0] + m.v[0] * t, p.c[1] + m.v[1] * t, p.c[2] + m.v[2] * t], R: I, h: p.h };
    a = m.max * t * Math.PI / 180;
    if (m.t === 'fold1') { R = rotZ(a); return { c: about(R, [m.hx, m.hy, 0], p.c), R: R, h: p.h }; }
    if (m.t === 'fold2') { R = rotZ(-a); c = about(R, [m.jx, m.hy, 0], p.c); var jx = m.hx + m.w * Math.cos(a), jy = m.hy + m.w * Math.sin(a); return { c: [c[0] + jx - m.jx, c[1] + jy - m.hy, c[2]], R: R, h: p.h }; }
  }
  // ---------- choque entre dos cajas orientadas (ejes separadores) ----------
  function col(R, j) { return [R[0][j], R[1][j], R[2][j]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  // devuelve la penetracion minima (>0 choca; <=0 separacion aproximada con signo)
  function pen(A, B, grow) {
    var ax = [], i, j, d = [B.c[0] - A.c[0], B.c[1] - A.c[1], B.c[2] - A.c[2]], best = 1e9;
    var a = [col(A.R, 0), col(A.R, 1), col(A.R, 2)], b = [col(B.R, 0), col(B.R, 1), col(B.R, 2)];
    for (i = 0; i < 3; i++) { ax.push(a[i]); ax.push(b[i]); }
    for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) { var x = cross(a[i], b[j]), n = Math.sqrt(dot(x, x)); if (n > 1e-6) ax.push([x[0] / n, x[1] / n, x[2] / n]); }
    for (i = 0; i < ax.length; i++) {
      var L = ax[i], ra = 0, rb = 0;
      for (j = 0; j < 3; j++) { ra += (A.h[j] + grow) * Math.abs(dot(a[j], L)); rb += B.h[j] * Math.abs(dot(b[j], L)); }
      var o = ra + rb - Math.abs(dot(d, L)); if (o < best) best = o;
    }
    return best;
  }
  var CTL = [['cama', 'Murphy bed'], ['closet', 'Puerta plegable del closet'], ['puertasC', 'Puertas pared de la cama (hasta 84")'], ['altasC', 'Puertas del segundo cuerpo (84-108")'], ['credenza', 'Credenza: corrediza 1 (zona cabecero)'], ['credenzaB', 'Credenza: corrediza 2 (zona cabecero)'], ['credenzaL', 'Credenza: puerta de la zona libre'], ['escritorio', 'Escritorio: puertas y bandeja'], ['consola', 'Consola home lab'], ['entrada', 'Puerta de entrada']];
  // barrido completo: cada pieza movil contra todo lo demas, con lo demas cerrado y abierto
  function sweep() {
    var movers = P.filter(function (p) { return p.mv && p.solid; }), all = P.filter(function (p) { return p.solid; }), out = {}, N = 30;
    function note(a, b, kind, t, tb, val) {
      var k = a.id < b.id ? a.id + '|' + b.id : b.id + '|' + a.id, r = out[k];
      if (!r || (kind === 'choque' && r.kind !== 'choque') || (kind === r.kind && val > r.val)) out[k] = { a: a.name, b: b.name, ga: a.ctl || a.grp, gb: b.ctl || b.grp, kind: kind, ta: t, tb: tb, val: val };
    }
    movers.forEach(function (a) {
      for (var s = 1; s <= N; s++) {
        var t = s / N, A = pose(a, t);
        all.forEach(function (b) {
          if (b === a) return;
          if (a.mv === b.mv && a.mv.t === 'bed') return;
          if (a.ctl === 'closet' && b.ctl === 'closet') return;
          if (a.id === 'dk_tray' && b.id.indexOf('dk_pr') === 0) return;
          var states = b.mv ? (b.ctl === a.ctl ? [t] : [0, 0.5, 1]) : [0];
          states.forEach(function (tb) {
            var B = pose(b, tb), o = pen(A, B, 0);
            if (o > 0.09) note(a, b, 'choque', t, tb, o);
            else if (a.grp !== b.grp && pen(A, B, 1) > 0) note(a, b, 'justo', t, tb, o);
          });
        });
      }
    });
    return Object.keys(out).map(function (k) { return out[k]; });
  }
  // choques en el estado actual (st: {control: t})
  function now(st, pst) {
    var all = P.filter(function (p) { return p.solid; }), res = [], ps = all.map(function (p) { return pose(p, p.ctl ? ((pst && pst[p.id] != null) ? pst[p.id] : (st[p.ctl] || 0)) : 0); });
    for (var i = 0; i < all.length; i++) for (var j = i + 1; j < all.length; j++) {
      var a = all[i], b = all[j]; if (!a.mv && !b.mv) continue;
      if (a.mv && a.mv === b.mv) continue; if (a.ctl === 'closet' && b.ctl === 'closet') continue;
      if ((a.id === 'dk_tray' && b.id.indexOf('dk_pr') === 0) || (b.id === 'dk_tray' && a.id.indexOf('dk_pr') === 0)) continue;
      var o = pen(ps[i], ps[j], 0); if (o > 0.09) res.push({ a: a, b: b, val: o });
    }
    return res;
  }
  root.A4 = { now: now, parts: P, pose: pose, sweep: sweep, CTL: CTL, dims: { W: W, D: D, H: H, FD: FD } };
})(typeof window !== 'undefined' ? window : globalThis);
