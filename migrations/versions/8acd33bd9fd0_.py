"""empty message

Revision ID: 8acd33bd9fd0
Revises: 
Create Date: 2021-05-25 19:25:16.770663

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8acd33bd9fd0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('project',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nome_projeto', sa.String(length=255), nullable=False),
    sa.Column('data_inicio', sa.TIMESTAMP(), nullable=False),
    sa.Column('data_fim', sa.TIMESTAMP(), nullable=False),
    sa.Column('valor_projeto', sa.Integer(), nullable=False),
    sa.Column('participantes', sa.String(length=255), nullable=False),
    sa.Column('risco_projeto', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('project')
    # ### end Alembic commands ###
