class Floor extends THREE.Group {
  constructor() {
    super();

    this.shadowMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(50, 50),
      new THREE.ShadowMaterial({ opacity: 0.05 }),
    );


    this.shadowMesh.receiveShadow = true;
    this.shadowMesh.rotation.x = Math.PI / -2;

    this.add(this.shadowMesh);
  }
}

export default Floor;