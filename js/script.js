/*
 Ce fichier contient toute la logique applicative en ES5 (compatible IE11+).
 Fonctionnement 100% local (file://), sans dépendances serveur.
 
 VARIABLES IMPORTANTES:
 - habitants[], maires[], agglomeration[] : Listes de login
 - _storageFallback : Fallback pour le stockage
 
 FONCTIONS PRINCIPALES:
 - getRoleFromURL() : Extrait le rôle depuis l'URL (?role=adm)
 - updateRoleNav() : Affiche/masque boutons navbar selon le rôle
 - valider() : Valide la connexion, redirige avec paramètre URL
 - last_page() : Mémorise la dernière page
 - dateheure() : Affiche date/heure formatée
 - est_dans() : Cherche utilisateur dans liste
 - initDateheure() : Initialise l'horloge
 - storageSet/storageGet : Wrapper localStorage
*/

// storageSet

var _storageFallback = {};
function storageSet(key, value) {
  try {
    if (window && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch (e) { }
  _storageFallback[key] = value;
}
function storageGet(key) {
  try {
    if (window && window.localStorage) {
      var v = window.localStorage.getItem(key);
      if (v !== null) return v;
    }
  } catch (e) { }
  return _storageFallback.hasOwnProperty(key) ? _storageFallback[key] : null;
}

// getRoleFromURL
function getRoleFromURL() {
  var params = new URLSearchParams(window.location.search);
  var roleFromURL = params.get('role');
  if (roleFromURL) {
    return roleFromURL;
  }
  // Sinon, chercher dans le storage
  return storageGet('role');
}

// updateRoleNav
function updateRoleNav() {
  var role = getRoleFromURL();
  var navAdm = document.getElementById('nav-adm');
  var navCom = document.getElementById('nav-com');
  var navAgg = document.getElementById('nav-agg');

  try {
    console.log('updateRoleNav() appelée - rôle: "' + role + '"');
    console.log('nav-adm trouvé: ' + !!navAdm + ', nav-com trouvé: ' + !!navCom + ', nav-agg trouvé: ' + !!navAgg);
  } catch (e) { }

  // Afficher/masquer les éléments en fonction du rôle
  if (navAdm) {
    navAdm.style.display = (role === 'adm') ? 'block' : 'none';
    try { console.log('nav-adm display: ' + navAdm.style.display); } catch (e) { }
  }
  if (navCom) {
    navCom.style.display = (role === 'com') ? 'block' : 'none';
    try { console.log('nav-com display: ' + navCom.style.display); } catch (e) { }
  }
  if (navAgg) {
    navAgg.style.display = (role === 'agg') ? 'block' : 'none';
    try { console.log('nav-agg display: ' + navAgg.style.display); } catch (e) { }
  }

  try { console.log('Rôle actuel: ' + role); } catch (e) { }
}

// initDateheure
function initDateheure() {
  var dateElement = document.getElementById('dateheure');
  if (dateElement) {
    dateheure();
    // Mettre à jour chaque minute pour garder l'heure exacte
    setInterval(dateheure, 60000);
  }
}

// Initialiser au chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
  last_page();
  updateRoleNav(); // Lire le rôle depuis sessionStorage et mettre à jour la navbar
  initDateheure();

  // Re-appeler updateRoleNav() après un court délai pour s'assurer que les éléments sont bien présents
  setTimeout(updateRoleNav, 100);
})

// iframes fullscreen
var _containers = document.querySelectorAll('.sheet-embed-container');
for (var _i = 0; _i < _containers.length; _i++) {
  (function (container) {
    var iframe = container.querySelector('.sheet-embed');
    var btn = container.querySelector('.sheet-fullscreen-btn');
    if (!iframe || !btn) return;
    btn.addEventListener('click', function () {
      try {
        if (document.fullscreenElement) {
          if (document.exitFullscreen) { document.exitFullscreen(); }
          else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
          return;
        }
        // Demander le fullscreen SUR L'IFRAME pour qu'il remplisse tout l'écran
        if (iframe.requestFullscreen) { iframe.requestFullscreen(); }
        else if (iframe.webkitRequestFullscreen) { iframe.webkitRequestFullscreen(); }
        else if (iframe.msRequestFullscreen) { iframe.msRequestFullscreen(); }
      } catch (e) {
        // Pas critique en local
      }
    });
  })(_containers[_i]);
}

// Utilisateurs
var habitants = [["Jfanne", "Jfanne45"], ["Administré", "Administré"], ["Jort", "Jort95"]];
var maires = [["Jfanne", "Jfanne45"], ["Maire", "Maire"]];
// Eviter les accents dans les identifiants de variables pour meilleure compatibilité
var agglomeration = [["agglo", "agglo"], ["Jort", "Jort95"]];

// est_dans
function est_dans(liste, id, mdp) {
  //fontion regardant si une liste [a, b] est dans une liste [[c, d], [e, f] ...]  
  for (var i = 0; i < liste.length; i++) {
    if (liste[i][0] == id && liste[i][1] == mdp) {
      return true;
    }
  }
  return false;
}

// valider
function valider() {
  //on récupère l'identifiant et le mot de passe
  var form = document.getElementById("connexion");
  var id = form.children[0].children[1].value;
  var mdp = form.children[1].children[1].value;
  var isAdmin = form.children[2].children[1].checked;

  //regarde quel rôle a une personne
  var role = null;

  // Si la checkbox admin n'est PAS cochée et c'est un habitant
  if (!isAdmin && est_dans(habitants, id, mdp)) {
    role = 'adm';
  }
  // Si c'est un maire (priorité agglomeration si l'user est dans les deux)
  else if (est_dans(agglomeration, id, mdp)) {
    role = 'agg';
  }
  // Si c'est un maire
  else if (est_dans(maires, id, mdp)) {
    role = 'com';
  }
  // Sinon si c'est un habitant (même sans checkbox)
  else if (est_dans(habitants, id, mdp)) {
    role = 'adm';
  }
  else {
    alert("Profil inconnu.\nVérifiez d'avoir bien écrit vos noms et prénoms");
    return; // Sortir si authentification échouée
  }

  // Définir le rôle dans le storage (backup) et rediriger avec paramètre URL
  if (role) {
    try { console.log('Avant setItem - storage.role: ' + storageGet('role')); } catch (e) { }
    storageSet('role', role);
    try { console.log('Après setItem - storage.role: ' + storageGet('role')); } catch (e) { }
    try { console.log('Connexion réussie. Rôle défini: ' + role); } catch (e) { }

    // Redirection vers index.html avec rôle en paramètre URL (?role=adm)
    setTimeout(function () {
      window.location.href = '../index.html?role=' + encodeURIComponent(role);
    }, 100);
  }
}

// last_page
function last_page() {
  //pour se souvenir de la dernière page pour un retour en arrière avec connexion
  var pathname = window.location.pathname;
  if (pathname.indexOf('connexion.html') === -1) {
    storageSet('last_page', pathname);
  } else if (storageGet('last_page') == null) {
    storageSet('last_page', '/index.html');
  }
}

// dateheure
function dateheure() {
  var now = new Date();
  var jour = now.getDate(); if (jour < 10) { jour = '0' + jour; }
  var mois = now.getMonth() + 1; if (mois < 10) { mois = '0' + mois; }
  var annee = now.getFullYear();
  var hh = now.getHours(); if (hh < 10) { hh = '0' + hh; }
  var mm = now.getMinutes(); if (mm < 10) { mm = '0' + mm; }
  var dateElement = document.getElementById('dateheure');
  if (dateElement) {
    dateElement.innerText = jour + '/' + mois + '/' + annee + ' ' + hh + ':' + mm;
  }
}




