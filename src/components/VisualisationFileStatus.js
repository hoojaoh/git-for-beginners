import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import { observer } from 'mobx-react';

import VisualisationObject3D from './VisualisationObject3D';
import { STATUS_ADDED, STATUS_DELETED } from '../constants';
import { FILE_WIDTH, FILE_DEPTH, FILE_HEIGHT } from './VisualisationFile';

const CHANGE_SIGNS = 4;
const CHANGE_FONT_SIZE = 0.1;
const PLUS_FACES = 10;

@withTheme
@observer
class FileStatus extends Component {
  constructor() {
    super();

    this.fileStatusObject = new THREE.Group();
    this.textGeometry = new THREE.BufferGeometry();

    this.textMesh = new THREE.Mesh(
      this.textGeometry,
      new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors }),
    );

    this.textMesh.rotation.y = Math.PI;
    this.textMesh.position.x = FILE_WIDTH / 2;
    this.textMesh.position.z = FILE_DEPTH / -2 - 0.001;

    this.fileStatusObject.add(this.textMesh);
  }

  render() {
    const { theme, font, file } = this.props;

    let geometry;

    if (file.status === STATUS_ADDED) {
      const shapes = font.generateShapes('+', CHANGE_FONT_SIZE, 0);
      geometry = new THREE.ShapeGeometry(shapes);

      for (let face of geometry.faces) {
        face.color = new THREE.Color(0xFFFFFFF);
      }
    } else if (file.status === STATUS_DELETED) {
      const shapes = font.generateShapes('-', CHANGE_FONT_SIZE, 0);
      geometry = new THREE.ShapeGeometry(shapes);

      for (let face of geometry.faces) {
        face.color = new THREE.Color(0xFFFFFFF);
      }
    } else {
      let plus = Math.round((file.diff.added / file.maxChanges) * CHANGE_SIGNS);
      let minus = Math.round((file.diff.removed / file.maxChanges) * CHANGE_SIGNS);

      // Min plusses
      if (plus === 0 && file.insertions > 0) {
        plus = 1;
      }

      // Min minuses
      if (minus === 0 && file.deletions > 0) {
        minus = 1;
      }

      const shapes = font.generateShapes(
        `${'+'.repeat(plus)}${'-'.repeat(minus)}`,
        CHANGE_FONT_SIZE,
        0
      );

      geometry = new THREE.ShapeGeometry(shapes);
      const plusFaces = plus * PLUS_FACES;

      for (let i = 0; i < geometry.faces.length; i++) {
        const face = geometry.faces[i];

        if (i < plusFaces) {
          face.color = theme.color.added;
        } else {
          face.color = theme.color.deleted;
        }
      }
    }

    geometry.translate(0.05, (FILE_HEIGHT - CHANGE_FONT_SIZE) / 2, 0);
    this.textGeometry.fromGeometry(geometry);

    return (
      <VisualisationObject3D object3D={this.fileStatusObject} />
    );
  }
}

export default FileStatus;
