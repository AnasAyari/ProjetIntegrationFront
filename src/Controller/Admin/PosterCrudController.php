<?php

namespace App\Controller\Admin;

use App\Entity\Poster;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;

class PosterCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Poster::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            ImageField::new('posterFile')
                ->setLabel('Poster')
                ->setBasePath('uploads/posters')
                ->setUploadDir('public/uploads/posters') // Path relative to your project root
                ->setRequired(false), // Optional: Set to true if the image is required
            TextField::new('album'),
            TextField::new('artist'),
            IntegerField::new('quantity'),
            DateTimeField::new('added_at')->setFormat('Y-MM-dd HH:mm:ss'),
            DateTimeField::new('updated_at')->setFormat('Y-MM-dd HH:mm:ss'),
        ];
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}